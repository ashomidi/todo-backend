import express from 'express';

const router=express.Router()

router.get("/home",(req,res,next)=>{
    res.send("This is the homepage request")
})

export default router;