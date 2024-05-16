const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')
app.use(express.static('public'))

app.get('/', (req, res) => {
  const checkvalue = req.query.checkboxes || []
  const passwordlength = req.query.passwordlength
  const passwordExclude = req.query.passwordExclude || []
  let password = generatePassword(checkvalue, passwordlength, passwordExclude)
  res.render('index', { passwordlength , password })
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})

function generatePassword(checkboxes, passwordlength, passwordExclude){
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

if(passwordExclude){
characterArr = characterArr.filter((character) => {
  if(passwordExclude.includes(character)){
    return false
  }
  return true
})
}

for(let i = 1; i <= passwordlength; i++){
password += characterArr[Math.floor(Math.random()*(characterArr.length))]
}

console.log('characterArr', characterArr)
console.log('password', password)
  return password
}
