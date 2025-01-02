import  User  from '../models/users.js'; // Sample Model Import

export const getAllUsers = async (req, res) => {
    try {
        const Users = await User.findAll({});
        return res.status(200).json(Users);
    } catch(error) {
        res.status(500).json({error: "Failed to get all Users"});
    }
};

export const getUserById = async (req, res) => {
    try {
        let id = req.params.user_id;
        let user = await User.findbyPk(id);

        if (!user) {
            return res.status(400).json({message: "No user found."});
        }
        else {
            return res.status(200).json({
                success: true,
                data: user
            });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error"});
    }
}

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.update(req.body, {where: { id: req.params.user_id} });
        res.status(200).json(updatedUser);
    } catch(error) {
        res.status(500).json({error: "Failed to update User."});
    }
}

export const deleteUser = async(req, res) => {
     try {
         await User.destroy(req.body, {where: { user_id: req.params.id }});
         res.status(202).send();
     } catch(error) {
        res.status(500).json({error: "Failed to delete User."});
     }
};
