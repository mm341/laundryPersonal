
import { language } from '@/models/languageSliceModel'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'



const initialState:language = {
    language: '',
    countryCode: 'US',
}

// Action creators are generated for each case reducer function
export const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state:language, action:PayloadAction<string>) => {
            state.language = action.payload
        },
        setCountryCode: (state:language, action:PayloadAction<string>) => {
            state.countryCode = action.payload
        },
    },
})

export const { setLanguage, setCountryCode } = languageSlice.actions

export default languageSlice.reducer
