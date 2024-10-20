const socket = io();

const groupNameInput = document.getElementById('group-name-input');
const joinButton = document.getElementById('join-button');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messagesContainer = document.getElementById('messages');
const groupsContainer = document.getElementById('groups');

// Track joined groups
const joinedGroups = new Set();
let currentGroup = '';

function addGroup(groupName) {
    if (!joinedGroups.has(groupName)) {
        joinedGroups.add(groupName);
        
        const groupItem = document.createElement('div');
        groupItem.textContent = groupName;
        groupItem.className = 'group-item';
        
        // Add click event to switch to this group
        groupItem.addEventListener('click', () => {
            if (currentGroup !== groupName) {
                socket.emit('joinGroup', groupName);
                currentGroup = groupName;
                messagesContainer.innerHTML = ''; // Clear previous messages
                // Load chat history when switching groups
                socket.emit('chatHistory', groupName);
            }
        });

        groupsContainer.appendChild(groupItem);
    }
}

// Join group functionality
joinButton.addEventListener('click', () => {
    const groupName = groupNameInput.value.trim();
    if (groupName) {
        socket.emit('joinGroup', groupName);
        addGroup(groupName);
        
        // Set current group to the newly created one
        currentGroup = groupName;
        
        groupNameInput.value = ''; // Clear the input field
        groupNameInput.disabled = true;
        joinButton.disabled = true;
        messageInput.disabled = false;
        sendButton.disabled = false;
    }
});

// Send a message when the button is clicked
sendButton.addEventListener('click', () => {
    const message = messageInput.value; // Get the message input
    if (message && currentGroup) {
        socket.emit('message', currentGroup, message); // Send the current group and message
        messageInput.value = ''; // Clear the input field
    }
});

// Display messages received from the server
socket.on('message', (message) => {
    const newMessage = document.createElement('div');
    newMessage.textContent = message; // Show the message
    messagesContainer.appendChild(newMessage);

    // Auto scroll to the bottom of the messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// Display chat history when joining a group
socket.on('chatHistory', (history) => {
    history.forEach(message => {
        const newMessage = document.createElement('div');
        newMessage.textContent = message; // Show the message
        messagesContainer.appendChild(newMessage);
    });

    // Auto scroll to the bottom of the messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
