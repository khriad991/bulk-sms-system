import toast from "react-hot-toast";
let EmailRegx = /\S+@\S+\.\S+/;


class FormHelper {
    IsEmpty(value) {
        return value?.length === 0;
    }

    IsEmail(value) {
        return !EmailRegx.test(value);
    }
    IsValidEmails(value){
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(value);
    }
    ErrorToast(msg) {
        toast.error(msg);
    }
    SuccessToast(msg) {
        toast.success(msg);
    }
    getBase64(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
        });
    }
}
export const { IsEmpty, IsEmail,IsValidEmails, ErrorToast, SuccessToast, getBase64 } = new FormHelper();
