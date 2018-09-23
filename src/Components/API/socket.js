import openSocket from 'socket.io-client';

const  socket = openSocket("https://axperience.herokuapp.com/");

function subscribeToResult(cb) {
  socket.on('update quiz user result', result => cb(null, result));
}

function subscribeToOnlineUser(cb) {
    socket.on('user at waiting page', result => cb(null, result));
  }

function emitOnlineUser(user){
    socket.emit('user at waiting page',user);
}

export { subscribeToOnlineUser, subscribeToResult, emitOnlineUser};