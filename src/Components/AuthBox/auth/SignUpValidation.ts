import React from 'react'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

const SignUpvalidation = () => {

    const{t}=useTranslation()
    return Yup.object({
        name:Yup.string().required(t("Full name is required")),
     
        phone: Yup.string()
            .required(t('Please give a phone number'))
            .min(12, t('number must be 12 digits')),
       
    })
}

export default SignUpvalidation