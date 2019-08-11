const express = require('express')
const nunjuncks = require('nunjucks')

const app = express()

nunjuncks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

// Middleware
const verificaVariavelIdade = (req, res, next) => {
  if (req.query.age === '' | !(req.query.age >= 0)) {
    return res.redirect('/')
  }
  return next()
}

app.get('/', (req, res) => {
  return res.render('new')
})

app.post('/check', (req, res) => {
  if (req.body.age >= 18) {
    return res.redirect(`/major?age=${req.body.age}`)
  } else {
    return res.redirect(`/minor?age=${req.body.age}`)
  }
})

app.get('/major', verificaVariavelIdade, (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

app.get('/minor', verificaVariavelIdade, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

app.listen(3000)
