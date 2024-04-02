export default function validatePhone(phone){
    return phone.length === 10 && !isNaN(phone);
};