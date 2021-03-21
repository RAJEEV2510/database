const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://mongo_db_user:RAJEEV@cluster0-4o2hk.mongodb.net/movie?retryWrites=true&w=majority',{useNewUrlParser:true,useCreateIndex:true, useUnifiedTopology: true })

const RequestSchema=mongoose.Schema({


    Movie_name: {
        type:String,
    }
    
})

const RequestModel=mongoose.model("request",RequestSchema);

module.exports=RequestModel




