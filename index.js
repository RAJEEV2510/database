const express=require('express');
const { Model } = require('mongoose');
const MovieModel=require('./Model/movieModel')
const WebSeriesModel=require('./Model/WebseriesModel');
const RequestModel=require('./Model/RequestMovie')
const adminrouter=require('./router/Admin')
const cors=require('cors');
const app=express();
const axios=require('axios')
const Nexmo = require('nexmo');
const { Telegraf } = require('telegraf')

const bodyParser=require('body-parser');

app.use(cors())
app.use('/admin',adminrouter);

app.use(bodyParser.json())

app.use(express.json());

app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')

const nexmo = new Nexmo({
    apiKey: 'cc758056',
    apiSecret: '2YFyRRuebaQau1wc',
  });
  

const bot=new Telegraf("1734489529:AAGHn65vPERAAmSnZMsLYcRxtCyK8dGwMq8")  
app.get('/form',(req,res)=>{

    res.render("index");

})


var text=""
var url=""
var text1=""
var url1=""
app.get("/",(req,res)=>{

        
    MovieModel.find({}).sort({$natural:-1}).limit(1).then(data=>{
        url=data[0].Movie_image_url
        text=`${data[0].Movie_name}  ${data[0].Movie_desc}
        .
        .
        .
        .
        Category: ${data[0].category}
        Rating :${data[0].rating}
        search and download it
        Download Website Link 👇👇
        https://main.d3pfo85lbqd5vn.amplifyapp.com/trending`
        
      
        })

bot.hears('hello members',(ctx)=>{
         
            ctx.replyWithPhoto({ url:url}, { caption: text })
})



       WebSeriesModel.find({}).sort({$natural:-1}).limit(1).then(data=>{
            url1=data[0].Movie_image_url
            
            text1=`${data[0].Movie_name}  ${data[0].Movie_desc}
                    .
                    .
                    .
                    .
        Category: ${data[0].category}
        Rating :${data[0].rating}
        search and download it
        Download Website Link 👇👇
        https://main.d3pfo85lbqd5vn.amplifyapp.com/trending`
    
  
    })



bot.hears('webseries',(ctx)=>{
         
        ctx.replyWithPhoto({ url:url1}, { caption: text1 })
})

MovieModel.find({}).sort({$natural:-1}).then((data)=>{
       
        res.render('mydashboard',{data})

    })
});





app.get('/category/:type/:page',(req,res)=>{

   
   
    const page=req.params.page;
    if(req.params.type!="all")
    {
        
        MovieModel.find({category:req.params.type}).then(data=>{
            console.log(data)
            MovieModel.find({category:req.params.type}).limit(10).skip(10*(page-1)).then(result=>{
    
            res.send({
                result,
                totalmovie:data.length,
                totalpages:parseInt(data.length/10+1)
             })
        })
    })
    }
    else
    {
        MovieModel.find({}).then((data)=>{
       
            MovieModel.find({}).limit(10).skip(10*(page-1)).sort({$natural:-1}).then((result)=>{
          
                
                res.status(200).json({
                    result,
                    totalmovie:data.length,
                    totalpages:parseInt(data.length/10+1)
                
                })
              
           }).catch(()=>{
               res.status(400).json({"error":"error"})
           })
       })
    }
})



app.post('/form',(req,res)=>{

    if(req.body.moviename==="" || req.body.moviedesc==="" || req.body.imageurl==="" || req.body.moviedownloadurl==="")
    {
        res.send("Please fil correct details")
    }
    else{
    const movie= new MovieModel({
        Movie_name:req.body.moviename ,
        Movie_desc:req.body.moviedesc,
        Movie_image_url:req.body.imageurl,
        Movie_download_url:req.body.moviedownloadurl,
        category:req.body.category,
        rating:req.body.rating
    })
 
    movie.save().then((data)=>{


       
        res.send("movie is submitted in data base")
    }).catch(()=>{
        res.send("error in submitted pls try again");
    })
    }
})
 
app.get("/delete/:id",(req,res)=>{

   
    MovieModel.findByIdAndDelete(req.params.id).then(data=>{
    
        res.send("Movie deleted in database");

    })
})  


app.get('/movie/api/:page',(req,res)=>{

   const page=req.params.page;
   //it first 2*6=12skip and then limit upto 6 and whole data
   MovieModel.find({}).then((data)=>{
       
        MovieModel.find({}).limit(10).skip(10*(page-1)).sort({$natural:-1}).then((result)=>{
      
            
            res.status(200).json({
                result,
                totalmovie:data.length,
                totalpages:parseInt(data.length/10+1)
            
            })
          
       }).catch(()=>{
           res.status(400).json({"error":"error"})
       })
   })
  
 
})

app.get('/moviesdata',(req,res)=>{

    MovieModel.find({}).then((data)=>{
        res.status(200).json(data)
    })
})

app.post("/search",(req,res)=>{

    var searchtext=req.body.search;
    searchtext=new RegExp(searchtext,'i');
    console.log(searchtext)
    MovieModel.find({Movie_name:searchtext}).then(result=>{
    
        res.send({
            result,
            totalmovie:result.length,
            totalpages:parseInt(result.length/10+1)
        })
    })
    
})



/**WORKING ON WEBSERIES API */


app.get('/webseries/api/:page',(req,res)=>{

    const page=req.params.page;
    //it first 2*6=12skip and then limit upto 6 and whole data
    WebSeriesModel.find({}).then((data)=>{
        
         WebSeriesModel.find({}).limit(10).skip(10*(page-1)).sort({$natural:-1}).then((result)=>{
       
             
             res.status(200).json({
                 result,
                 totalmovie:data.length,
                 totalpages:parseInt(data.length/10+1)
             
             })
           
        }).catch(()=>{
            res.status(400).json({"error":"error"})
        })
    })
   
  
 })
 

app.get('/webseries',(req,res)=>{

    res.render("Webseries");
})


app.post('/webseries',(req,res)=>{

    if(req.body.moviename==="" || req.body.moviedesc==="" || req.body.imageurl==="" || req.body.moviedownloadurl==="")
    {
        res.send("Please fil correct details")
    }
    else{

    const movie= new WebSeriesModel({
        Movie_name:req.body.moviename ,
        Movie_desc:req.body.moviedesc,
        Movie_image_url:req.body.imageurl,
        
        category:req.body.category,
        rating:req.body.rating,
        season1:req.body.season1,
        season2:req.body.season2,
        season3:req.body.season3,
        season4:req.body.season4,
        season5:req.body.season5,
        season6:req.body.season6,
        season7:req.body.season7,
        season8:req.body.season8,
        season9:req.body.season9,
        season10:req.body.season10,
    })
 
    movie.save().then((data)=>{

        res.send("movie is submitted in data base")

    }).catch(()=>{
        res.send("error in submitted pls try again");
    })
    }  
    
})


//webseries api
app.post("/webseries/search",(req,res)=>{

    var searchtext=req.body.search;
    searchtext=new RegExp(searchtext,'i');
    console.log(searchtext)
    
    WebSeriesModel.find({Movie_name:searchtext}).then(result=>{
    
        res.send({
            result,
            totalmovie:result.length,
            totalpages:parseInt(result.length/10+1)
        })
    })
    
})



app.get("/web",(req,res)=>{

    WebSeriesModel.find({}).sort({$natural:-1}).then((data)=>{
       
        res.render('webdashboard',{data})

    })
});


app.post('/request/movie',(req,res)=>{

    const name=req.body.name
    console.log(req.body)
    const movie=new RequestModel({
        Movie_name:name
    })

   
    movie.save().then((data)=>{

        res.status(200).json(data)
        const from = 'Vonage APIs';
        const to = '919310142074';
        nexmo.message.sendSms(from, to, "Movie-name "+name);
    })
   
})

//telegram bot
// app.get('/telegram',(req,res)=>{


//     MovieModel.find({}).sort({$natural:-1}).limit(1).then(data=>{
//         const bot=new Telegraf("1734489529:AAGHn65vPERAAmSnZMsLYcRxtCyK8dGwMq8")
//         var chat_id=-1001328492675 original chat id
//         console.log(data)
//         bot.hears('hello members',(ctx)=>{
         
//             const text=`${data[0].Movie_name}  ${data[0].Movie_desc}
//             .
//             .
//             .
//             .
//             Category: ${data[0].category}
//             Rating :${data[0].rating}
//             Download Website Link 👇👇
//             https://main.d3pfo85lbqd5vn.amplifyapp.com/trending`

//         ctx.replyWithPhoto({ url:data[0].Movie_image_url }, { caption: text })
//     })
//     bot.launch();
//     res.send("BOT LAUNCH")


//     })  
   
    
    // var test_chat_id=-1001327414894 this is test chat id
    // var url=`https://api.telegram.org/bot1734489529:AAGHn65vPERAAmSnZMsLYcRxtCyK8dGwMq8/sendMessage?chat_id=-1001327414894&text=/hello_members`

    // axios.get(url).then(data=>{})

  
    // bot.use((ctx)=>{
    //     ctx.reply("Nice movie")

    // })

    // bot.start((ctx)=>{
    //     ctx.reply("bot started")
    // })

    // bot.hears("update",(ctx)=>{

    //     ctx.reply("new movies")
    // })

    // bot.command('say',(ctx)=>{
    //     ctx.reply("hello")
    // })
    
    
   



//     console.log("HELLO WORLD");
//   
//     var chat_id=-1001328492675
//     const text='&lthref=""&gthello&lagl'
//     var url=`https://api.telegram.org/bot1734489529:AAGHn65vPERAAmSnZMsLYcRxtCyK8dGwMq8/sendMessage?chat_id=-1001328492675&text=${text}`

//   axios.get(url).then(data=>console.log(data))

// })

bot.launch();

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log('server is running on 5000.')
})