const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  const checkValue = req.query.checkboxes || []
  const passwordlength = req.query.passwordlength
  let password = generatePassword(checkValue, passwordlength)
  res.render('index', { passwordlength , password })
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})


function generatePassword(checkboxes, passwordlength){

let password = ''
let characterArr = []
const characterLower = 'abcdefghijklmnopqrstuvwxyz'
const characterUpper = characterLower.toUpperCase()
const numbers = '1234567890'
const specialIcon = `!@#$%^&*(){}"?><`

if(checkboxes.includes('checkbox1')){
characterArr = characterArr.concat(characterLower.split(''))
};

if(checkboxes.includes('checkbox2')){
characterArr = characterArr.concat(characterUpper.split(''))
}

if(checkboxes.includes('checkbox3')){
characterArr = characterArr.concat(numbers.split(''))
}

if(checkboxes.includes('checkbox4')){
characterArr = characterArr.concat(specialIcon.split(''))
}

for(let i = 1; i <= passwordlength; i++){
password += characterArr[Math.floor(Math.random()*(characterArr.length))]
}

console.log('password', password)
  return password
}
