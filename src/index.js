const path = require('path')
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const categoryRouter = require('./routers/category') 
const tutorialRouter = require('./routers/tutorial')
const courseRouter = require('./routers/course')
const otherRouter = require('./routers/other')
const commentRouter = require('./routers/comment')
const activationRouter = require('./routers/activation')

const app = express()
const port = process.env.PORT
 
// app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(express.json())
app.use(userRouter)
app.use(categoryRouter)
app.use(tutorialRouter)
app.use(courseRouter)
app.use(otherRouter)
app.use(commentRouter) 
app.use(activationRouter)
// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// })

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})