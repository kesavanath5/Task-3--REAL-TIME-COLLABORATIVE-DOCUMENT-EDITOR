const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/collab', {
  useNewUrlParser: true, useUnifiedTopology: true
});

const DocSchema = new mongoose.Schema({
  content: String
});
const Document = mongoose.model('Document', DocSchema);

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

let currentDoc = null;

io.on('connection', async socket => {
  if (!currentDoc) {
    let doc = await Document.findOne();
    if (!doc) doc = await Document.create({ content: '' });
    currentDoc = doc;
  }

  socket.emit('init', currentDoc.content);

  socket.on('edit', async newContent => {
    currentDoc.content = newContent;
    await currentDoc.save();
    socket.broadcast.emit('update', newContent);
  });
});

server.listen(4000, () => console.log('Backend listening on port 4000'));