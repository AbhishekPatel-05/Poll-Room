const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinPoll', (pollId) => {
      socket.join(pollId);
      console.log(`Socket ${socket.id} joined poll ${pollId}`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = setupSocket;