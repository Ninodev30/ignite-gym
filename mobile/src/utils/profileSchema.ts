import { object, string, ref } from 'yup';

const profileSchema = object({
    old_password: string()
        .required('Informe a senha antiga.'),

    new_password: string()
        .required('Informe a nova senha.')
        .min(6, 'A senha deve ter no mínimo 6 dígitos.')
        .notOneOf([ref('old_password'), null], 'A confirmação da nova senha não confere.'),

    confirm_new_password: string()
        .required('Informe a confirmação da senha.')
        .oneOf([ref('new_password'), null], 'A confirmação da nova senha não confere.')
})

export default profileSchema;