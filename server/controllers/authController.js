import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req,res)=>{
  try{
    const {username,email,password} = req.body;
    const exists = await User.findOne({email});
    if(exists) return res.status(400).json({message:'User exists'});
    const hash = await bcrypt.hash(password,10);
    const user = new User({username,email,password:hash});
    await user.save();
    res.status(201).json({message:'ok'});
  }catch(e){res.status(500).json({message:e.message})}
}
export const login = async (req,res)=>{
  try{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message:'invalid'});
    const ok = await bcrypt.compare(password,user.password);
    if(!ok) return res.status(400).json({message:'invalid'});
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET||'secret',{expiresIn:'1d'});
    res.json({token,user:{id:user._id,username:user.username,email:user.email}});
  }catch(e){res.status(500).json({message:e.message})}
}
