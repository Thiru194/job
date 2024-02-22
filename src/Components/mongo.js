const mongoose=require('mongoose'); 

const task = new mongoose.Schema({
    companyname:{
       type:String,
       required:true
    },
    aboutjob:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    mail:{
        type:String,
        required:true
    }

})
const Task= mongoose.model("Task",task);
module.exports=Task;


