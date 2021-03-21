const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://mongo_db_user:RAJEEV@cluster0-4o2hk.mongodb.net/movie?retryWrites=true&w=majority',{useNewUrlParser:true,useCreateIndex:true, useUnifiedTopology: true })

const MovieSchema=mongoose.Schema({


    Movie_name: {
        type:String,
        
    },
    Movie_desc:String,
    Movie_image_url:String,
    category:String,
    rating:String,
    season1:String,
    season2:String,
    season3:String,
    season4:String,
    season5:String,
    season6:String,
    season7:String,
    season8:String,
    season9:String,
    season10:String,
 })

const WebSeriesModel=mongoose.model("webseries",MovieSchema);

module.exports=WebSeriesModel