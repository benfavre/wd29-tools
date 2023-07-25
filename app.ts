import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('WD29 tools'))

export default app