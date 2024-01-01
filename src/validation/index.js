import * as yup from 'yup'
import { REGEX } from '../constants/regex'

const validateString = (key) => {
    return yup.string().required(`${key} is required`)
        .test('Validate key', `Invalid ${key}`, function (value) {
            return value.trim().length > 0
        })
}

export const validateProfile = yup.object().shape({
    name: validateString('name'),
    role: validateString('role'),
    nationality: validateString('nationality'),
    phone: yup.string().required("Phone is required").matches(REGEX.REGEX_PHONE, "Invalid Phone"),
    gender: validateString('gender'),
    address: validateString('address'),
    want_to: validateString('want_to'),
    // password: yup.string().required('Password is required').matches(REGEX.REGEX_PASSWORD, "Invalid Password")
})