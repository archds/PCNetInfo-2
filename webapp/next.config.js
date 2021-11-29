require('dotenv').config({
    path: './config/.env'
})

module.exports = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_BACKEND_ROOT_URI: `http://${process.env.BACKEND_IP_ADDR}:8000`
    }
}
