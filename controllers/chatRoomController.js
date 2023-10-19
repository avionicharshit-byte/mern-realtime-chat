const ChatRoom = require('../models/ChatRoom');

const chatRoomController = {
  getAllChatRooms: async (req, res) => {
    try {
      const chatRooms = await ChatRoom.find();
      res.json(chatRooms);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getChatRoomById: async (req, res) => {
    const id = req.params.id;
    try {
      const chatRoom = await ChatRoom.findById(id);
      if (chatRoom) {
        res.json(chatRoom);
      } else {
        res.status(404).json({ message: 'Chat room not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createChatRoom: async (req, res) => {
    const { name } = req.body;
    const newChatRoom = new ChatRoom({ name });
    try {
      const savedChatRoom = await newChatRoom.save();
      res.status(201).json(savedChatRoom);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  updateChatRoom: async (req, res) => {
    const id = req.params.id;
    try {
      const updatedChatRoom = await ChatRoom.findByIdAndUpdate(id, req.body, { new: true });
      if (updatedChatRoom) {
        res.json(updatedChatRoom);
      } else {
        res.status(404).json({ message: 'Chat room not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  deleteChatRoom: async (req, res) => {
    const id = req.params.id;
    try {
      const deletedChatRoom = await ChatRoom.findByIdAndDelete(id);
      if (deletedChatRoom) {
        res.json(deletedChatRoom);
      } else {
        res.status(404).json({ message: 'Chat room not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = chatRoomController;
