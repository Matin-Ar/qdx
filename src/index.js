const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const categoryRouter = require('./routers/category') 
const tutorialRouter = require('./routers/tutorial')
const courseRouter = require('./routers/course')

const app = express()
const port = process.env.PORT
 
app.use(express.json())
app.use(userRouter)
app.use(categoryRouter)
app.use(tutorialRouter)
app.use(courseRouter)
 
app.listen(port, () => {
  console.log('Server is up on port ' + port)
})

const Category = require('./models/category')
const Tutorial = require('./models/tutorial')
const Course = require('./models/course')

const alaki = async () => {
  // const tutorial = await Tutorial.findOne({ name: 'python' })
  // await tutorial.populate('cat').execPopulate()
  // console.log(tutorial)

  // const category = await Category.findOne({ name: 'backend' })
  // await category.populate('tutorials').execPopulate()
  // console.log(category.tutorials)
  // await category.tutorials[0].populate('courses').execPopulate()
  // console.log(category.tutorials[0].courses)
  // category.tutorials.forEach(async (tut) => {
  //   await tut.populate('courses').execPopulate()
  //   console.log(tut.courses)
  // })

  // const tutorial = await Tutorial.findOne({ name: 'react' })
  // await tutorial.populate('courses').execPopulate()
  // console.log(tutorial.courses)

  // const course = await Course.findOne({ name: 'amoozesh 10 saate php' })
  // await course.populate('tut').execPopulate()
  // console.log(course)

}

alaki()