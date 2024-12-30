import { Request, Response } from 'express';
import { ErrorResponseHandling } from '../helper/EroorResponse';
import User from '../models/User';
import Connection from '../models/Connection';

// follow/unfollow
export const follow = async (req: Request, res: Response): Promise<any> => {
  try {
    // fetch data
    const { toUser } = req.body;
    const fromUser = req.user?.id;

    // validation
    if (!fromUser || !toUser) {
      return ErrorResponseHandling(res, 400, 'User not found');
    }

    // is valid user
    const [FromUser, ToUser]: [FromUser: any, ToUser: any] = await Promise.all([
      User.findOne({ _id: fromUser }),
      User.findOne({ _id: toUser }),
    ]);

    // validation
    if (!FromUser || !ToUser) {
      return ErrorResponseHandling(res, 400, 'Invalid credentials');
    }

    // check is AlreadyFollowed
    const isAlreadyFollowed = FromUser.following.includes(ToUser._id);

    // yes then unfollow
    if (isAlreadyFollowed) {

      // delete from db
      await Connection.findOneAndDelete({
        from: FromUser._id,
        to: ToUser._id,
      });

      // update user
      await Promise.all([
        User.findByIdAndUpdate(
          { _id: FromUser._id },
          { $pull: { following: ToUser._id } },
          { new: true },
        ).populate('following'),
        User.findByIdAndUpdate(
          { _id: ToUser._id },
          { $pull: { followers: FromUser._id } },
          { new: true },
        ).populate('followers'),
      ]);
      return res.status(200).json({
        success: true,
        message: 'Unfollowed successfully',
        key: false,
      });
    }

    // if not then save in db/follow
    await Connection.create({
      from: FromUser._id,
      to: ToUser._id,
    });

    // update user
    await Promise.all([
      User.findByIdAndUpdate(
        { _id: FromUser._id },
        { $push: { following: ToUser._id } },
        { new: true },
      ).populate('following'),
      User.findByIdAndUpdate(
        { _id: ToUser._id },
        { $push: { followers: FromUser._id } },
        { new: true },
      ).populate('followers'),
    ]);

    return res
      .status(200)
      .json({ success: true, message: 'Followed successfully', key: true });
  } catch (error) {
    console.log(error);
    return ErrorResponseHandling(res, 500, 'Internal server error');
  }
};

