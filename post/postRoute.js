const router = require('express').Router()
const db = require('../data/db')
const sId = require('shortid').generate()





router.post('/',(req,res)=>{
    const post = req.body

    if(post.title && post.contents){
      

        db.insert(post)
        .then((item)=>{
            res.status(200).json(item)
        })
        .catch((err)=>res.status(500).json({errorMessage:"could not load into server"}))

        
        

    }else{
        res.status(400).json({errorMessage:'Please provide Title and Contents'})

    }
    
})

router.post('/:id/comments',(req,res)=>{
    const text = req.body

    const {id} = req.params
    text.id= id

    if(text.text){
      
        db.insertComment(text)
        .then((item)=>{
            res.status(200).json(item)

            console.log('success')
        })
        .catch((err)=>{
            res.status(404).json({errorMessage:'The post with the specified ID does not exist.'})
        })


    }else{
        res.status(400).json({errorMessage:'Please add Text'})
    }
})



router.get('/',(req,res)=>{
    db.find()
    .then((items)=>res.status(201).json(items))
})

module.exports = router