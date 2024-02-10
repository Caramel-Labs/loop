/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {

    images: {
        domains: ['res.cloudinary.com']
      },
    async headers() {
        return [
            
                {
                    // matching all API routes
                    source: "/api/:path*",
                    headers: [
                        { key: "Access-Control-Allow-Credentials", value: "true" },
                        { key: "Access-Control-Allow-Origin", value: "http://localhost:3000, http://localhost:8000" }, // origins separated by comma
                        { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                        { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                    ]
                }         
        ]
    }
}