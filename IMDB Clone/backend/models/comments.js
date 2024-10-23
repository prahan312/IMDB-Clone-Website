import mongoose from 'mongoose';
const commentsSchema=mongoose.Schema(
    {
        username:{
            type: String,
            requried: true,
        },
        movie_id:{
            type:String,
            required:true, 
        },
        comment:{
            type:String,
            required:true,
        },
        parent_id:{
            type:String,
            required:true,
        },
        comment_id:{
            type:String,
            required:true,
        },
    },
    {
        timestamps:true,
    }
);
export const comments=mongoose.model('comments',commentsSchema);