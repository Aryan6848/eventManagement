const express= require('express');
require("./db/config");
const Tickets = require('./db/Tickets')
const app = express();
const cors= require("cors");

//chat 
const http = require("http");
const { Server }=require ("socket.io");
const server = http.createServer(app);
const   socketServer=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
});
const users = {};




app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true,}));
app.post('/ticketform',async(req,resp)=>{
    console.log("m chl gya");
    try{

        let ticket = new Tickets(req.body);
        console.log(ticket);
        let result = await ticket.save();

        console.log(req.body);
        resp.status(200).json(result);
    }
    catch(error){
        console.error("Error in saving ticket:", error);
        resp.status(500).send("Internal Server Error");
    }
})

app.get('/tickets', async(req,resp)=>{
    let tickets = await Tickets.find();
    console.log("request aa gayi ");
    console.log(tickets);
    if(tickets.length>0){
        resp.send(tickets);
    }else{
        resp.send({result:"No product found"});
    }
})

app.delete('/tickets/:id', async(req,resp)=>{
    console.log("delete chala");
    const result = await Tickets.deleteOne({_id:req.params.id});
    resp.send(result);
});

app.listen(5001,()=>{
    console.log("DB connected");
})




//chat code 
socketServer.on('connection',socket => { // jaise hi connection aye is socket m ek arrow function ko run kr do 
    //io.on is socket.io ka instance h jo sare socket connection ko listen krega yani koi bhi connect krega to ye chalega 
   socket.on('new-user-joined', name =>{
        console.log("user joined", name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name)//jisne join kiye usko chork sbko event emit(send) krega
   });
  

//    //now chat meassage koi bhej rha tb  
   socket.on('send', message=>{
      //send kiya kisi ne to bakiyo ko  recieve kra do 
      socket.broadcast.emit('recieve',{message: message, name: users[socket.id]})//recieve event ka naam h tm kuch bhi naam rkh skte ho, we will handle all this event on client side
    });

    socket.on('disconnect',message =>{
      console.log("user lef the chat");
      socket.broadcast.emit('left',users[socket.id]);

      delete users[socket.id];
    })
})
   
    server.listen(5002,()=>{
      console.log("server on port 5002");
    })

    socketServer.on("connection", (socket) =>{
      console.log(" a user connected");
    });
