import React from 'react'

import WidgetShimmer from './WidgetShimmer'
import CustomShimmerForForm from './CustomShimmerForForm'
import { CustomBoxFullWidth } from '@/styles/PublicStyles'

const CustomShimmerForProfile = () => {
    return (
        <CustomBoxFullWidth  sx={{minHeight:"77px"}} >
            <WidgetShimmer />
            <CustomShimmerForForm />
        </CustomBoxFullWidth>
    )
}

export default CustomShimmerForProfile
