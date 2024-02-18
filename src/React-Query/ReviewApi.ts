import { rating } from "@/Components/UserInfo/ProfileBody/OrderRateDiaolg"
import MainApi from "@/api/MainApi"


export const ReviewApi = {
    submit: (formData:rating) => {
        return MainApi.post('customer/ratings', formData)
    },
   
}
