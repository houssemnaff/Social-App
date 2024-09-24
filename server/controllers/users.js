import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const allusers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const finduserbyname = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the name is provided
    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }

    // Create a regex pattern for a case-insensitive partial match
    const namePattern = new RegExp(name, 'i');

    // Search for users by first name or last name
    const users = await User.find({
      $or: [
        { firstName: { $regex: namePattern } },
        { lastName: { $regex: namePattern } }
      ]
    });

    // Check if any users were found
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    // If users found, return them
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
// signale un user 
export const signaleuser = async (req, res) => {
  try {
    const idusersignle = req.params.id;
    const id_user_signle_user = req.body.userid;
    const user = await User.findById(idusersignle);
    
    if (!user || !id_user_signle_user) {
      return res.status(404).json({ message: 'User not found or missing user ID' });
    }
    if (user.signle.includes(id_user_signle_user)) {
      return res.status(400).json({ message: 'User has already been signed by this user' });
    }
    user.signle.push(id_user_signle_user); // Ajoute l'ID de l'utilisateur signé au tableau `signle`
    await user.save(); // Sauvegarde les modifications dans la base de données

    res.status(200).json({ message: 'User has been marked as signed', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};
export const deleteuser = async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id); // Assurez-vous de passer req.params.id directement
    if (!result) {
      return res.status(404).json("User not found");
    }
    res.status(200).json("User deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
