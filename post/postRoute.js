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

    const id = req.params.id
    

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
        .catch(() => res.status(500).json({ error: "The posts information could not be retrieved." }))
})

router.get('/:id',(req,res)=>{
    db.findById(req.params.id)
    .then(item=>res.status(201).json(item))
        .catch(() => res.status(500).json({ error: "The posts information could not be retrieved." }))
})


router.get('/:id/comments',(req,res)=>{
    db.findCommentById(req.params.id)
    .then(item=>res.status(200).json(item))
})

router.get('/posts/:id',(req,res)=>{
    db.findById(req.params.id)
    .then((item)=>res.status(200).json(item))
    .catch(()=>res.status(500).json({errorMessage:''}))
})

router.delete('/:id',(req,res)=>{
    db.remove(req.params.id)
    .then((item)=>res.status(200).json(item))
    .catch((err)=>{
        res.status(500).json({errorMessage:'item could not be found'})
    })
})




module.exports = router