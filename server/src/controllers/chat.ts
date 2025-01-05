import { userConnection } from '../websocket/sendMessage';
import User from '../models/User';
import Message from '../models/Message';
import Chat from '../models/Chat';
import { WebSocket } from 'ws';
import { Request, Response } from 'express';
import { ErrorResponseHandling } from '../helper/EroorResponse';

// createChat
export const createChat = async (req: Request, res: Response): Promise<any> => {
  try {
    // fetch data
    const { user1, user2 } = req.body;

    // validation
    if (!user1 || !user2) {
      return ErrorResponseHandling(res, 400, 'Provide user details');
    }

    // already or not exist
    let chat = await Chat.findOne({ participants: { $all: [user1, user2] } });
    if (chat) {
      return ErrorResponseHandling(res, 400, 'Chat already exist');
    }

    // createChat
    const data = await Chat.create({ participants: [user1, user2] });

    // updateUser
    await User.findByIdAndUpdate(
      { _id: user1 },
      { $push: { chats: data._id } },
      { new: true },
    );
    await User.findByIdAndUpdate(
      { _id: user2 },
      { $push: { chats: data._id } },
      { new: true },
    );

    return res.status(200).json({
      sucess: true,
      message: 'Chat created',
    });
  } catch (error) {
    console.log(error);
  }
};

// fetchAllChat of user
export const fetchChat = async (req: Request, res: Response): Promise<any> => {
  try {
    // fetch data
    const userId = req.user?.id;

    // validation
    if (!userId) {
      return ErrorResponseHandling(res, 400, 'Provide user details');
    }

    // already or not exist
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return ErrorResponseHandling(res, 400, 'User not found');
    }

    // findAllChat
    const data = await User.findOne({ _id: userId })
      .select('name email image')
      .populate({
        path: 'chats',
        populate: {
          path: 'participants',
          select: 'name email image',
        },
      });

    // return res
    return res.status(200).json({
      success: true,
      message: 'all chat fetched',
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

// sendMessage
export const createMessage = async (body: any) => {
  try {
    // fetch data
    let { chatId, sender, receiver, text } = body.payload;

    // socket
    const ws1 = userConnection.get(sender);
    const ws2 = userConnection.get(receiver);

    // validation
    if (!chatId || !sender || !receiver || !text) {
      ws1?.send(
        JSON.stringify({
          type: 'recieveMessage',
          payload: 'provide all details',
        }),
      );

      ws2?.send(
        JSON.stringify({
          type: 'recieveMessage',
          payload: 'provide all details',
        }),
      );
      return;
    }

    // already or not exist
    let chat = await Chat.findOne({ _id: chatId });
    if (!chat) {
      chat = await Chat.create({ participants: [sender, receiver] });
      chatId = chat._id;
    }

    // create message
    const newMessage = await Message.create({
      chat: chatId,
      sender,
      receiver,
      text,
    });

    // sendMessage
    const data = await Message.findById(newMessage._id).populate([
      {
        path: 'sender',
        select: 'name email image',
      },
      { path: 'receiver', select: 'name email image' },
    ]);

    // send to sender and receiver
    if (ws1 && ws1.readyState === WebSocket.OPEN) {
      ws1.send(
        JSON.stringify({
          type: 'recieveMessage',
          payload: data,
        }),
      );
    } else {
      console.log('not sent');
    }

    if (ws2 && ws2.readyState === WebSocket.OPEN) {
      ws2.send(
        JSON.stringify({
          type: 'recieveMessage',
          payload: data,
        }),
      );
    } else {
      console.log('not sent again');
    }

    // updateChat
    const updatedChat = await Chat.findByIdAndUpdate(
      { _id: chatId },
      { $push: { message: newMessage._id } },
      { new: true },
    );
  } catch (error) {
    console.log(error);
  }
};

// fetchMessage
export const fetchMessage = async (body: any) => {
  try {
    // fetch data
    const { chatId, sender } = body.payload;

    // validation
    if (!chatId || !sender) {
      return;
    }

    // find socket
    const ws = userConnection.get(sender);
    if (!ws) {
      console.log('sender not available');
      return;
    }

    // check isChat exist
    const isChat = await Chat.findById(chatId);
    if (!isChat) {
      ws.send(
        JSON.stringify({
          type: 'error',
          payload: 'Invalid Chat',
        }),
      );
    }

    // if it does -> findAllMessage
    const data = await Message.find({ chat: chatId }).populate([
      {
        path: 'sender',
        select: 'name email image',
      },
      { path: 'receiver', select: 'name email image' },
    ]);

    if (data) {
      ws.send(
        JSON.stringify({
          type: 'fetchMessage',
          payload: data,
        }),
      );
    }

    return;
  } catch (error) {
    console.log(error);
  }
};
