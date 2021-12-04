import { NextRouter } from 'next/dist/shared/lib/router/router'
import { useCookies } from 'react-cookie'

const authenticate = (router: NextRouter) => {
    const [cookies, setCookie] = useCookies(['token'])
    if (!cookies.token) {
        router.push('/auth')
    }
}

export default authenticate