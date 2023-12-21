import { useEffect } from 'react'
import { withRouter } from 'next/router'
import CustomRouter from './CustomRouter'

 function ScrollToTop({router}:{router:CustomRouter}) {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [router.pathname])

    return null
}

export default withRouter(ScrollToTop)