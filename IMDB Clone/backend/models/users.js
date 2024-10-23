import mongoose from 'mongoose';
const UserSchema=mongoose.Schema(
    {
        first:{
            type: String,
            requried: true,
        },
        last:{
            type:String,
            required:true, 
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        fav_list:{
            type:Array,
            required:true,
        }
    },
    { 
        timestamps:true,
    }
);
export const User=mongoose.model('user',UserSchema);
