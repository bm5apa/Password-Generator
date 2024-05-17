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
  const checkboxObj = Object.assign({}, checkvalueObj(checkvalue))
  const options = req.query
  const passwordlength = req.query.passwordlength
  const passwordExclude = req.query.passwordExclude || []
  let password = generatePassword(checkvalue, passwordlength, passwordExclude)
  res.render('index', { passwordlength , password, checkboxObj:checkboxObj, options:options })
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
})

function checkvalueObj(checkvalue){
let checkvalueArr = []

if(checkvalue.includes('checkbox1')){
checkvalueArr.push('checkbox1')
}else{
  checkvalueArr.push(null)
}

if(checkvalue.includes('checkbox2')){
checkvalueArr.push('checkbox2')
}else{
  checkvalueArr.push(null)
}

if(checkvalue.includes('checkbox3')){
checkvalueArr.push('checkbox3')
}else{
  checkvalueArr.push(null)
}

if(checkvalue.includes('checkbox4')){
checkvalueArr.push('checkbox4')
}else{
  checkvalueArr.push(null)
}

return checkvalueArr
}

function generatePassword(checkboxes, passwordlength, passwordExclude){
let password = ''
let characterArr = []
const characterLower = 'abcdefghijklmnopqrstuvwxyz'
const characterUpper = characterLower.toUpperCase()
const numbers = '1234567890'
const specialIcon = `!@#$%^&*(){}"?><`

if(checkboxes.length < 1){
return password = '"Please check the checkboxes!"'
}else{

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

  return password
}
}
