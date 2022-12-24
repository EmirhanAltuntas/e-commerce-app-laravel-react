import * as yup from "yup"

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

export const loginSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid any email").required("Required"),
    password: yup.string().min(6).matches(passwordRules, { message: 'Please create a stronger password!' }).required("Required")
})

export const registerSchema = yup.object().shape({
    name:yup.string().min(5).required("Required"),
    email: yup.string().email("Please enter a valid any email").required("Required"),
    password: yup.string().min(6).matches(passwordRules, { message: 'Please create a stronger password!' }).required("Required")
})

export const tempStoreSchema = yup.object().shape({
    store_name:yup.string().min(6,'Store name must be at least 6 characters').max(15).required("Required"),
    tax_number:yup.string().min(11,'Tax number must be at least 11 characters').max(11,'Tax number must be at least 11 characters').required("Required"),
    tel_number:yup.string().min(10,'Tel number must be at least 10 characters').max(10,'Tel number must be at least 10 characters').required("Required"),
})
