import { object, string, ref } from 'yup';

const profileSchema = object({
    name:
        string()
            .required('Informe o nome'),

    password:
        string()
            .min(6, 'A senha deve ter no mínimo 6 dígitos.')
            .nullable()
            .transform((value) => !!value ? value : null),

    confirm_password:
        string()
            .nullable()
            .transform((value) => !!value ? value : null)
            .oneOf([ref('password'), null], 'A confirmação da nova senha não confere.')
            .when('password', {
                is: (field: true) => field,
                then:
                    string()
                        .nullable()
                        .required('Informe a confimação da senha.')
                        .transform((value) => !!value ? value : null)
            })
})

export default profileSchema;