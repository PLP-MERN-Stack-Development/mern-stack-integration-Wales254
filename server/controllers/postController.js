import Post from '../models/post.js';
export const getPosts = async (req,res)=>{
  try{ const posts = await Post.find().sort({createdAt:-1}); res.json(posts) }catch(e){res.status(500).json({message:e.message})}
}
export const createPost = async (req,res)=>{
  try{
    const {title,content,authorName} = req.body;
    const p = new Post({title,content,authorName});
    await p.save();
    res.status(201).json(p);
  }catch(e){res.status(400).json({message:e.message})}
}
