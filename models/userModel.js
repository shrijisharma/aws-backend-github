const mongoose=require("mongoose");
const{Schema}=mongoose;

const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
    },
    repositories:[
        {
            deafult:[],
            type:Schema.Types.ObjectId,
            ref:"Repository",
        },
    ],
    followedUsers:[
        {
            deafult:[],
            type:Schema.Types.ObjectId,
            ref:"User",
        },
    ],
    starRepos:[
        {
            default:[],
            type:Schema.Types.ObjectId,
            ref:"Repository",
        },
    ]
});
const User=mongoose.model("User",UserSchema);
module.exports= User;