import app from './src/app'
import { handle } from '@hono/node-server/vercel'
export default handle(app)