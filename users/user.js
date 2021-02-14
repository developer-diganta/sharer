const users=[];


function userJoin(id, user,file){
  const usere={id,user,file};

  users.push(usere);

  return usere;
}

function getCurrentUser(id){
  return users.find(usere=>usere.id===id);
}

function userLeave(id){
  const index=users.findIndex(user=>user.id===id);

  if(index!==-1){
    return users.splice(index,1)[0];
  }
}

function getRoomUsers(room){
  return users.filter(user=>user.room===room);
}
module.exports={
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
};
