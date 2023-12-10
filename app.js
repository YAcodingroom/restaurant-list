import express from 'express'

const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  res.send('Hello home page here')
})

app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  res.send(`The page id is ${id}`)
})

app.get('/search', (req, res) => {
  res.send('Search result here')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})