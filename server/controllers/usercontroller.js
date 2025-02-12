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
        const { id } = req.params;
        let user = await db.User.findByPk(id);
        
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found with given ID."
            });
        }

        const updatedUser = await user.update(req.body);
        
        return res.status(200).json({
            success: true,
            data: {
                user: updatedUser,
            }
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({error: "Internal server error, Failed to update User."});
    }
}

export const deleteUser = async(req, res) => {
     try {
        const { id } = req.params;
        let user = await db.User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User not found with given id."
            });
        }

         await user.destroy(req.body, {where: { user_id: req.params.id }});
         res.status(200).send(); // send
     } catch(error) {
        console.log(error);
        res.status(500).json({error: "Internal server error, Failed to delete User."});
     }
};
