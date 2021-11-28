require('dotenv').config({
    path: './config/.env'
})

module.exports = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_BACKEND_ROOT_URI: process.env.BACKEND_ROOT_URI
    }
}
