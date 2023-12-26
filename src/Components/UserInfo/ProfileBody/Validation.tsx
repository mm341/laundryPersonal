
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

const ValidationSechemaProfile = () => {
    const {t}=useTranslation()
    return Yup.object({
        name: Yup.string().required(t('Full name is required')),
        phone: Yup.string().required(t('phone number required')),
    })
}

export default ValidationSechemaProfile
