//chat sockets are the observers on the server, recieve all incoming messages
module.exports.chatSocket=function(socketSever){
    //interaction from sockets will be done here
    let io=require('socket.io')(socketSever);

    io.sockets.on('connection',function(socket){//recieve the connection
        console.log('new connection recieved',socket.id);//socket is object

        socket.on('disconnect',function(){//for disconnection of server
            onscrollend.log('socket disconnected!');
        });

        socket.on('join_room',function(data){
            console.log('joining request rec.',data);

            socket.join(data.chatroom);//user will be connected if wants to join

            //tell other user that this user wants to join so for that emit
            io.in(data.chatroom).emit('user_joined',data);
        });
        // CHANGE :: detect send_message and broadcast to everyone in the room
        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });

    });
}