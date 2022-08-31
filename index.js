require('dotenv').config();
require('./config/mongoose.config').connect();

const express = require('express');

const userRoutes = require('./route/user');
const todoRoutes = require('./route/todo')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (_, res) => {
    try {
        res.status(200).json({
            status: 'OK',
            msg: 'Server is running'
        })
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            msg: 'Internal server error'
        })
    }
    
})

app.use('/users', userRoutes)
app.use('/todos', todoRoutes)

app.listen(port, () => {
    console.log(`Server is Listening on port ${port}`)
})
