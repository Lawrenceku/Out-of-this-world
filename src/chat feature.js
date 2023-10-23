const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const users = new Map();

wss.on('connection', (ws) => {
  let userId;

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    switch (data.type) {
      case 'login':
        if (users.has(data.userId)) {
          ws.send(JSON.stringify({
            type: 'login',
            success: false,
            message: 'User ID already taken',
          }));
        } else {
          userId = data.userId;
          users.set(userId, ws);
          ws.send(JSON.stringify({
            type: 'login',
            success: true,
            message: 'Login successful',
          }));
        }
        break;
      case 'message':
        if (data.recipientId && users.has(data.recipientId)) {
          users.get(data.recipientId).send(JSON.stringify({
            type: 'message',
            senderId: userId,
            text: data.text,
          }));
        } else {
          ws.send(JSON.stringify({
            type: 'message',
            success: false,
            message: 'Recipient not found',
          }));
        }
        break;
    }
  });

  ws.on('close', () => {
    users.delete(userId);
  });
});
