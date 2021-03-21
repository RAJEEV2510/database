const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://mongo_db_user:RAJEEV@cluster0-4o2hk.mongodb.net/movie?retryWrites=true&w=majority',{useNewUrlParser:true,useCreateIndex:true, useUnifiedTopology: true })

const MovieSchema=mongoose.Schema({


    Movie_name: {
        type:String,
        
    },
    Movie_desc:String,
    Movie_image_url:String,
    Movie_download_url: String,
    category:String,
    rating:String,

})

const MovieModel=mongoose.model("movie",MovieSchema);

module.exports=MovieModel




