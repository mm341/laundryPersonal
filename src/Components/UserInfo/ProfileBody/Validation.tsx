
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

const ValidationSechemaProfile = () => {
    const {t}=useTranslation()
    return Yup.object({
        first_name: Yup.string().required(t('Full name is required')),
        mobile: Yup.string().required(t('phone number required')),
    })
}

export default ValidationSechemaProfile
