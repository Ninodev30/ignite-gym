import { object, string, ref } from 'yup';

const loginSchema = {
    signIn: object({
        email: string()
            .required('Informe o seu e-mail.')
            .email('E-mail inválido.'),

        password: string()
            .required('Informe a senha.')
            .min(6, 'A senha deve ter no mínimo 6 dígitos.'),
    }),

    signUp: object({
        name: string()
            .required('Informe o nome.'),

        email: string()
            .required('Informe o seu e-mail.')
            .email('E-mail inválido.'),

        password: string()
            .required('Informe a senha.')
            .min(6, 'A senha deve ter no mínimo 6 dígitos.'),

        password_confirm: string()
            .required('Informe a confirmação de senha.')
            .oneOf([ref('password'), null], 'A confirmação de senha não confere.')
    })
}

export default loginSchema;