import MainApi from '@/api/MainApi'
import { useMutation } from 'react-query'


const postHandler = async (token:string) => {

    const { data } = await MainApi.post('/customer/profile/update-fcm-token', {
        fcm_token: token,
        // _method: 'put',
    })
    return data
}
export const useStoreFcm = () => {
    return useMutation('fcm_token', postHandler)
}
