import express from 'express'
import { createRequire } from 'module'
import { engine } from 'express-handlebars'

const app = express()
const port = 3000
const require = createRequire(import.meta.url)
const restaurants = require('./public/json/restaurant.json').results

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');


app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

app.get('/restaurants', (req, res) => {
  res.render('index', { restaurants })
})

app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  const restaurant = restaurants.find((data) => data.id.toString() === id)
  res.render('show', { restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const matchedData = restaurants.filter((data) => {
    const categoryIsMatched = data.category.includes(keyword)
    const nameIsMatched = data.name.includes(keyword)
    const enNameIsMatched = data.name_en.toLowerCase().includes(keyword.toLowerCase())
    
    return categoryIsMatched || nameIsMatched || enNameIsMatched
  })
  res.render('index', { restaurants: matchedData })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})