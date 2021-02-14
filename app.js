const express = require('express');
const bodyParser=require("body-parser");
const http=require("http");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
const socketio=require("socket.io");
const server = http.createServer(app);

const io=socketio(server);
app.use(express.static("public"));


let codesCollection=[];
let files=[];

let data=[];

io.on("connection",socket=>{
  socket.on("joinShare",({ur,room,code})=>{
    socket.join(room);
    var det={
      name:ur,
      id:socket.id
    };
    var tr=true;
    for(i=0;i<codesCollection.length;i++){
      if(codesCollection[i].name==room){
          codesCollection[i].use.push(det);
          tr=false;
          console.log(codesCollection);
      }
    }
    if(tr==true){

      var u=[det];
      var shar={
        name:room,
        code:code,
        use:u
      };

      codesCollection.push(shar);
      tr=true;
    }


    var i;
    for(i=0;i<files.length;i++){
      if(files[i].code==room){
        s=files[i].fil;
        break;
      }
    }
    var j;
    for(j=0;j<codesCollection.length;j++){
        if(codesCollection[j].name==room){
          break;
        }
    }
    socket.emit("message",s);
    console.log(files[i].name);
    console.log(codesCollection[j].use)
    io.to(room).emit("roomUsers",codesCollection[j].use);

  })

  socket.on("chatMessage",({nm,msg})=>{

    s=msg;
    for(i=0;i<files.length;i++){
      if(files[i].code==nm){
        files[i].fil=s;
      }
    }
    io.to(nm).emit("message",s);
  });


  socket.on("disconnect",()=>{
  for(i=0;i<codesCollection.length;i++){
    for(j=0;j<codesCollection[i].use.length;j++){
      if(codesCollection[i].use[j].id==socket.id){
        codesCollection[i].use.splice(j,1);
        console.log(codesCollection[i].use);
        io.to(codesCollection[i].name).emit("roomUsers",codesCollection[i].use);

      }
    }
  }

});

});


app.get("/",function(req,res){
  res.render("index",{ch:1});
});


app.post("/check",function(req,res){
  var usr=req.body.uname;
  var name=req.body.shareName;
  var code=req.body.shareCode;
  for(i=0;i<codesCollection.length;i++){
    if(codesCollection[i].name==name){
      if(codesCollection[i].code==code){
        console.log(codesCollection);
        res.render("sharer",{p:usr,name:name,code:code});
      }
    }
  }
  res.render("index",{ch:0});
})

var p=1;
app.post("/create",function(req,res){
  var usr=req.body.uname;
  var name=req.body.shareName;
  var code=req.body.shareCode;
  for(i=0;i<codesCollection.length;i++){
    if(codesCollection[i].name==name){
      res.render("index",{ch:0});
    }
  }
  var u=[usr];
  var shar={
    name:name,
    code:code,
    use:u
  };
  var f="";
  var chat={
    code:name,
    fil:f
  };
  files.push(chat);
  p=p+1;
  res.render("sharer",{p:usr,name:name,code:code});

})

server.listen(process.env.PORT || 3000,function(){
  console.log("Running on 3000")
});
