import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:');

function getComments(callBack){
    socket.on('timer',timestamp => callBack(null,timestamp));
    socket.emit('getComments',1000);
}

export{getComments};