import app from './app'
import { getFreePort } from './helpers'
if (!process.env.PORT) {
    process.env.PORT = await getFreePort(3000) as unknown as string        
}

console.log('Server running on port', process.env.PORT)

export default {
    fetch: app.fetch,
    port: process.env.PORT,
}