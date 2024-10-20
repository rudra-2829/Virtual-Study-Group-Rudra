const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (CSS and JS)
app.use(express.static(path.join(__dirname)));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'chat.html'));
});

// Store chat history for each group
const chatHistory = {}; // Object to store chat history

io.on('connection', (socket) => {
    console.log('A user connected');

    // Listen for join group event
    socket.on('joinGroup', (groupName) => {
        socket.join(groupName);
        // Send chat history to the user when they join
        socket.emit('chatHistory', chatHistory[groupName] || []);
        
        // Notify other users in the group about the new user
        socket.to(groupName).emit('message', `A new user has joined the group: ${groupName}`);
    });

    // Listen for messages
    socket.on('message', (groupName, message) => {
        // Store the message in the chat history
        if (!chatHistory[groupName]) {
            chatHistory[groupName] = [];
        }
        chatHistory[groupName].push(message);
        
        // Broadcast to all clients in the group
        io.to(groupName).emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
