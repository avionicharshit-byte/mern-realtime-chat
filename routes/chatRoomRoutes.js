const express = require('express');
const router = express.Router();
const chatRoomController = require('../controllers/chatRoomController');

// Define routes for chat room-related operations
router.get('/chatrooms', chatRoomController.getAllChatRooms);
router.get('/chatrooms/:id', chatRoomController.getChatRoomById);
router.post('/chatrooms', chatRoomController.createChatRoom);
router.put('/chatrooms/:id', chatRoomController.updateChatRoom);
router.delete('/chatrooms/:id', chatRoomController.deleteChatRoom);

module.exports = router;
