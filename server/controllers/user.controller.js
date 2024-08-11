import User from "../models/user.model.js";

export const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePhoto: user.profilePhoto,
      coverPhoto: user.coverPhoto,
      bio: user.bio,
      createdAt: user.createdAt,
      followers: user.followers,
      following: user.following,
    });
  } catch (error) {
    console.log(
      "Error in user controller, getUserInfo function: ",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const follow = async (req, res) => {
  const { userToFollowId } = req.body;
  const userId = req.user._id;

  try {
    const userToFollow = await User.findById(userToFollowId);
    const userThatFollows = await User.findById(userId);

    if (!userToFollow) {
      return res.status(404).json({ error: "User not found" });
    }

    if (userToFollow._id.equals(userId)) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    }

    if (userToFollow.followers.includes(userId)) {
      // Unfollow
      userToFollow.followers = userToFollow.followers.filter(
        (followerId) => !followerId.equals(userId)
      );
      userThatFollows.following = userThatFollows.following.filter(
        (followingId) => !followingId.equals(userToFollowId)
      );
    } else {
      // Follow
      userToFollow.followers.push(userId);
      userThatFollows.following.push(userToFollowId);
    }

    await userToFollow.save();
    await userThatFollows.save();

    res.status(200).json({
      message: "Follow/unfollow completed successfully",
      updatedUser: {
        _id: userThatFollows._id,
        fullName: userThatFollows.fullName,
        email: userThatFollows.email,
        profilePhoto: userThatFollows.profilePhoto,
        coverPhoto: userThatFollows.coverPhoto,
        bio: userThatFollows.bio,
        createdAt: userThatFollows.createdAt,
        followers: userThatFollows.followers,
        following: userThatFollows.following,
      },
    });
  } catch (error) {
    console.log("Error in user controller, follow function: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getRandomUsersNotFollowing = async (req, res) => {
  const userId = req.user._id;
  try {
    console.log(userId);

    const user = await User.findById(userId).populate("following");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const followingIds = user.following.map(
      (followingUser) => followingUser._id
    );

    const usersNotFollowing = await User.find({
      _id: { $nin: followingIds.concat(user._id) },
    }).limit(5);

    res.status(200).json(usersNotFollowing);
  } catch (error) {
    console.log(
      "Error in user controller, getRandomUsersNotFollowing function: ",
      error.message
    );
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const search = async(req, res) => {
  try {
    const {searchQuery} = req.params;
    const regex = new RegExp(searchQuery, 'i');

    const result = await User.find({ fullName: { $regex: regex } });
    const users = result.map(user => ({
      _id: user._id,
      fullName: user.fullName,
      profilePhoto: user.profilePhoto
    }));

    res.status(200).json(users);
  } catch(error) {
    console.log("Error in user controller, search function: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

