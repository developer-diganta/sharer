const user=$(".use")[0].innerHTML;
const code=$(".cod")[0].innerHTML;
const ur=$(".file")[0].innerHTML;

room=user;
console.log(user);
console.log(code);
const socket = io();
var a;
nm=user;
socket.emit("joinShare",{ur,room,code});
$(function(){
$('#textarea').data('old',$('#textarea').val())
setInterval(function() {
  if($('#textarea').val() != $('#textarea').data('old')){


      msg=$('#textarea').val();


      socket.emit('chatMessage',{nm,msg});
  }
  $('#textarea').data('old',$('#textarea').val())
}, 100);
})

socket.on('roomUsers',(users)=>{

  console.log(users);
  outputUsers(users);
});


function outputUsers(users){
list="";
  for(i=0;i<users.length;i++){
    console.log(users);
    list+="<li>"+users[i].name+"</li>";
  }
  document.querySelector(".userLt").innerHTML=list;

}
socket.on("message",message=>{
  $('#textarea').val(message);
  $('#textarea').data('old',message);
});
