import UserModel from "../models/userModel.js";
export const getUserProfileAndRepos = async (req, res) => {
  const { username } = req.params;
  try {
    // 60 requests per hour, 5000 requests per hour for authenticated requests
    // https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });

    const userProfile = await userRes.json();

    const repoRes = await fetch(userProfile.repos_url, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });
    const repos = await repoRes.json();
    // res.send({ success: true, message: "success" });

    res.status(200).json({ userProfile, repos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const likeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await UserModel.findById(req.user._id.toString());
    console.log("request from user", req.user);
    // console.log(user, "Auth User!");
    const userToLike = await UserModel.findOne({ username });
    if (!userToLike) {
      return res.status(404).json({ error: "User not found!" });
    }
    if (user.likedProfiles.includes(userToLike.username)) {
      return res.status(400).json({ error: "You already liked this profile!" });
    }
    userToLike.likedBy.push({
      username: user.username,
      avatarUrl: user.avatarUrl,
      likedDate: Date.now(),
    });
    user.likedProfiles.push(userToLike.username);

    await Promise.all([userToLike.save(), user.save()]);
    res
      .status(200)
      .json({ success: true, message: "Profile liked successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLikes = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id.toString());
    res.status(200).json({ likedBy: user.likedBy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
