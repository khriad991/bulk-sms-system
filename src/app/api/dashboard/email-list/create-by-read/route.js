import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';

export const config = {
    api: {
        bodyParser: false,
        // add your fileSize limite
    },
};
export async function POST(req) {
    try {
        const prisma = new PrismaClient();

        const headerList = new Headers(req.headers);
        let userId = parseInt(headerList.get('id'));

        // Get uploaded file details
        const formData = await req.formData();
        let file = formData.get('file');
        let name = formData.get('name');
        let type = formData.get('type');

        if (!file) {
            return NextResponse.json({
                status: 'fail',
                message: `No file uploaded`,
            });
        }

        // Check if the file type is an Excel file
        const validMimeTypes = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
        ];

        if (!validMimeTypes.includes(file.type)) {
            return NextResponse.json({
                status: 'fail',
                message: `${file.type} not supported!!, Please upload an Excel/.xlsx file.`,
            });
        }
        // Check if a record with the same type and name already exists
        const existingRecord = await prisma.email_list.findFirst({
            where: {
                type: type,
                name: name,
            },
        });

        if (existingRecord) {
            return NextResponse.json({
                status: 'fail',
                message: `${existingRecord["type"]} & ${existingRecord["name"]} already exist`,
            });
        }

        // Convert file to buffer
        let bytes = await file.arrayBuffer();
        let buffer = Buffer.from(bytes);

        // Read the file buffer using XLSX
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Extract emails
        // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const GetEmails = jsonData.reduce((acc, row) => {
            for (let key in row) {
                if (emailPattern.test(row[key])) {
                    acc.push(row[key]);
                }
            }
            return acc;
        }, []);

        const uniqueEmails = [...new Set(GetEmails)];

        const data = await  prisma.email_list.create({
            data:{
                type,
                name,
                userId,
                all_email:uniqueEmails
            }
        })

        return NextResponse.json({
            status: 'success',
            message: `Total ${uniqueEmails.length} Unique Emails got`,
            duplicate_email:`${GetEmails.length - uniqueEmails.length} Duplicate Emails are Removed`,
            data,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({
            status: 'fail',
            message: error.message,
            data: error.toString(),
        });
    }
}
