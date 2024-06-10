const jsonServer = require('json-server')
const path = require('path')

const port = process.env.PORT || 4000

const router = jsonServer.router(path.join(__dirname, 'db.json')) // Path to db.json
const server = jsonServer.create() // Express server

// Avoid CORS issue
server.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

server.use(router)

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
