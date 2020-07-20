const express = require('express');
const uuid = require('uuid');
let users = require('../models/User');
const passwordvalidator =require('password-validator');
const { check, validationResult } = require('express-validator');
const router = express.Router();

//GET

router.get('/', async (req,res)=>{

    try{
        const Userdb = await users.find();
        res.send(Userdb);
    }
    catch(err){
        res.status(500).send('SERVER ERROR');
    }
}); 
//GET BY ID
router.get('/:id', async (req,res)=>{

    try{
       const found = await users.findById(req.params.id);
       //console.log(found.id);
        if(found){
            res.status(200).json(found);
        }
        if(!found)
        {
            res.status(404).json({'msg':'This user does not exist'});
        }
    }
    catch(err){
        res.status(500).send('SERVER ERROR');
    }
});

//POST 
//INSERT 

router.post('/',
[
    check('email','Email is empty').not().isEmpty(),
    check('name','name is empty').not().isEmpty(),
    check('password','password is empty').not().isEmpty(),
    check('email','Email not valid').isEmail(),
    check('password','password should be of minimum 8 characters').isLength({min:8}),

],
 async (req,res)=>{
    try{ 
        const error = validationResult(req);
        if(!error.isEmpty()){
            return res.status(422).json({errors : error.array()})
        }
        const newUser= new users({ 
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
        });
        const addUser = await newUser.save();
        res.send(addUser);
    }
    catch(err){
        res.status(500).send('SERVER ERROR');
    }
});

//DELETE
router.delete('/',
[
    check('id','ID is empty').not().isEmpty(),
],
async (req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({errors : error.array()})
    }
    const found = user.findById(req.body.id);
    if(!found){
        res.json({msg:'User id not found'});
    }
    try{
        await users.findByIdAndRemove({_id: req.body.id});
        res.json({msg:'User is deleted'});
    }
    catch(err){
        res.status(500).send('SERVER ERROR'+ err);
    }
});

// PUT
// UPDATE
// API/USERS/ID

router.put('/',
[   
check('email','Email is empty').not().isEmpty(),
    check('name','name is empty').not().isEmpty(),
    check('password','password is empty').not().isEmpty(),
    check('email','email is empty').not().isEmpty(),
    check('email','Email not valid').isEmail(),
    check('password','password should be of minimum 8 characters').isLength({min:8}),

],
async (req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({errors : error.array()})
    }
        try{
                const userUpdt = await users.findById(req.body.id)
                console.log(userUpdt);
                if(!userUpdt){
                    return res.status(422).send('user is not found');
                }

                userUpdt.name = req.body.name;
                userUpdt.email = req.body.email;
                userUpdt.password = req.body.password;

                await userUpdt.save();
                res.send('User is Updated');
        }
       catch(err){
        res.status(500).send('SERVER ERROR');
    }
    
    
});

module.exports = router;