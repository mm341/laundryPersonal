
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'

const ValidationSechemaProfile = () => {
    const {t}=useTranslation()
    return Yup.object({
        f_name: Yup.string().required(t('name is required')),
        phone: Yup.string().required(t('phone number required')),
    })
}

export default ValidationSechemaProfile
