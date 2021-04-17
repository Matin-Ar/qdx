const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const categoryRouter = require('./routers/category') 
const tutorialRouter = require('./routers/tutorial')

const app = express()
const port = process.env.PORT
 
app.use(express.json())
app.use(userRouter)
app.use(categoryRouter)
app.use(tutorialRouter)
 
app.listen(port, () => {
  console.log('Server is up on port ' + port)
})

const Category = require('./models/category')
const Tutorial = require('./models/tutorial')

const alaki = async () => {
  // const tutorial = await Tutorial.findOne({ name: 'python' })
  // await tutorial.populate('cat').execPopulate()
  // console.log(tutorial)

  // const category = await Category.findOne({ name: 'Other' })
  // await category.populate('tutorials').execPopulate()
  // console.log(category.tutorials)
}

alaki()