const express = require('express')
const app = express()
app.use( express.json())

const postRoute = require('./post/postRoute')
app.use('/api/post',postRoute)




app.get('/',(req,res)=>{
    res.send('Api Connected')
})

app.listen(4000,()=>console.log('now connected'))