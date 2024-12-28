import User from '../models/users'; // Sample Model Import

export const createUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);

    } catch (error) {
        res.status(500).json({error: "Failed to Create User"});
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const Users = await User.findAll();
        res.status(200).json(Users);
    } catch(error) {
        res.status(500).json({error: "Failed to get all Users"});
    }
};

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.update(req.body, {where: { user_id: req.paramas.id} });
        res.status(200).json(updatedUser);
    } catch(error) {
        res.status(500).json({error: "Failed to update User."});
    }
}

export const deleteUser = async(req, res) => {
     try {
         await User.destroy(req.body, {where: { user_id: req.paramas.id }});
         res.status(202).send();
     } catch(error) {
        res.status(500).json({error: "Failed to delete User."});
     }
};
