import app from './app'
import { serve  } from '@hono/node-server'

serve(app, (info) => {
    console.log(`Listening on http://localhost:${info.port}`) // Listening on http://localhost:3000
})