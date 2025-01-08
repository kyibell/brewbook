import db from '../models/index.js'; // Sample Model Import

export const getAllUsers = async (req, res) => {
    try {
        const User = await db.User.findAll({});
        return res.status(200).json(User);
    } catch(error) {
        res.status(500).json({error: "Failed to get all Users, Internal Server Error."});
      //  console.log(error);
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        let user = await db.User.findByPk(id);

        if (!user) {
            return res.status(404).json({message: "No user found."});
        }
        else {
            return res.status(200).json({
                success: true,
                data: user
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error, Failed to get User by ID"});
    }
}

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await db.User.update(req.body, {where: { id: req.params.user_id} });
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
