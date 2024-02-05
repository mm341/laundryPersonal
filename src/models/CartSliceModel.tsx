import { AddresseInterface } from "@/interfaces/AddresseInterface";
import { CartListInterface } from "@/interfaces/CartListResponseInterface";


export type CartListModel={
    isloading: boolean,
    cartList: CartListInterface,
    isLoadingAddToCart:boolean
    isLoadingUpdateCart:boolean
    isloadingDeleteCart:boolean
}