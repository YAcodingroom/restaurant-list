import express from 'express'
import { engine } from 'express-handlebars'

const app = express()
const port = 3000

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');


app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  res.render('index')
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