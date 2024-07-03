
import React from 'react';
import HomePageLayout from "@/components/layouit/HomePageLayout";
import AddEmailForm from "@/components/form/AddEmailForm";

const Page = () => {
    return (
        <main>
            <HomePageLayout>
                <AddEmailForm />
            </HomePageLayout>
        </main>
    );
};

export default Page;