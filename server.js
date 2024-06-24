const jsonServer = require('json-server')
const path = require('path')
const generateImage = require('./generateImage')

const port = process.env.PORT || 4000

const router =
  process.env.NODE_ENV === 'development'
    ? jsonServer.router(path.join(__dirname, 'db.json')) // Access local db.json
    : jsonServer.router(JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')))) // Read only db.json
const server = jsonServer.create() // Express server
const middlewares = jsonServer.defaults()

// Avoid CORS issue
server.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

server.use('/img/:dimension/:hexColor', generateImage)
server.use(middlewares)
server.use(router)

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
