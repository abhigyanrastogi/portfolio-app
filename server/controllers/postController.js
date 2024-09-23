const Post = require('../schema/Post');
const asyncHandler = require('express-async-handler');
const User = require('../schema/User');
const makeResponse = require('./makeResponse');

// @desc GET all posts
// @method GET /posts
// @access PRIVATE
const getAllPosts = asyncHandler(async (req, res)=>{
    const posts = await Post.find().lean();
    // if there are no posts
    if(!posts?.length) {
        return makeResponse(res, "No posts found", false);
    }
    //posts found
    return makeResponse(res, "Posts attached:", true, posts);
});

// @desc create a new post
// @method POST /posts
// @access PRIVATE
const createNewPost = asyncHandler(async (req, res)=>{
    //TODO: Verify if the author mentioned in request is the person that is sending the request
    const { title, author, content } = req.body;
    //if no title
    if(!title) {
        return makeResponse(res, "Need a title", false);
    }
    //if no author
    if(!author) {
        return makeResponse(res, "Need an author", false);
    }
    //if no content
    // TODO: add support for images/ videos/ binary files (Eventually for malware scanning)
    if(!content) {
        return makeResponse(res, "Need some content", false);
    }

    //check if author exists
    const authorExists = await User.findOne({username:author.username}).select('-hashedpwd').exec();
    if(!authorExists) {
        return makeResponse(res, "Author does not exist", false);
    }

    //check if same title exists already
    const duplicateTitle = await Post.findOne({ title }).populate('author').exec();
    if(duplicateTitle) {
        if(duplicateTitle.author.id !== authorExists.id) {
            return makeResponse(res, `Title already exists and belongs to ${duplicateTitle.author.username}`, false);
        } else {
            return makeResponse(res, `Title already exists and belongs to you, consider editing it instead!`, false);
        }
    }

    const post = await Post.create({title, "author":authorExists, content});
    if(!post) {
        return makeResponse(res, "There was an error making the post", false);
    }
    return makeResponse(res, "Post created successfully!", true);
});

// @desc update a post
// @method UPDATE /posts
// @access PRIVATE
const updatePost = asyncHandler(async (req, res)=>{
    const { id, title, content, comments } = req.body;
    //should user be able to change the author?
    //--> If they are giving up their authorship to someone else who is willing to take it
    //--> would require a confirmation from that user
    //TODO: ask author that is mentioned to confirm that they want to author this post
    //TODO: make this method secure so that flooding of requests doesnt take place for the author
    // CURRENTLY NOT ALLOWING USER TO CHANGE THE AUTHOR
    if(!id && !title) {
        return makeResponse(res, "Need id or title to update!", false);
    }
    if(!title && !content && !comments) {
        return makeResponse(res, "Nothing to update!", false);
    }
    let post = null;
    if(id) {
        post = await Post.findById(id).exec();
        if(title) {
            const duplicatePost = await Post.find({ title }).exec();
            //maybe there is no change in title, so the id should match
            if(duplicatePost._id !== id) {
                return makeResponse(res, `Title : ${title} is already owned by another user, choose a different title`, false);
            }
        }
    } else if(title) {
        post = await Post.findOne({title}).exec();
    }
    //check if post author is this author
    // if(author === )
    //checking if duplicate title exists
    //if there is no change in the post
    if(post.title === title && post.content === content && post.comments === comments) {
        return makeResponse(res, `No change in ${title}`, false);
    }
    //there is some change in the post, going to save it
    if(title)
        post.title = title;
    if(content)
        post.content = content;
    if(comments)
        post.comments = comments;
    const postSave = await post.save();
    if(!postSave) {
        return makeResponse(res, "Error while updating post", false);
    }
    return makeResponse(res, "Post updated", true);
});

// @desc delete a post
// @method DELETE /posts
// @access PRIVATE
const deletePost = asyncHandler(async (req, res)=>{
    const { id, title, author } = req.body;

    if(!id || !title || !author) {
        return makeResponse(res, "Need id title and author", false);
    }

    const post = await Post.findById(id).exec();

    if(post.author !== author) {
        return makeResponse(res, `Post does not belong to ${author}`, false);
    }
    if(post.title !== title) {
        return makeResponse(res, `Post id does not have the title ${title}`, false);
    }

    const postDelete = await post.deleteOne().lean().exec();

    if(!postDelete) {
        return makeResponse(res, "Error deleting the post", false);
    }

    return makeResponse(res, "Deleted the post", true);
});

module.exports = {
    getAllPosts,
    createNewPost,
    updatePost,
    deletePost
}
