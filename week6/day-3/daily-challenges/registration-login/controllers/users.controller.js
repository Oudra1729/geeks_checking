import UserModel from "../models/model.js";

const userModel = new UserModel();

export const registerUser = async (req, res) => {
    const { email, username, password, first_name, last_name } = req.body;

    try {
        const user = await userModel.register({
            email,
            username,
            password,
            first_name,
            last_name
        });
        res.status(201).json(user);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.findByUsername(username);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isValidPassword = await userModel.verifyPassword(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid password" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.findAllUsers();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getUserById = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await userModel.findUserById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const updatedData = req.body;
    try {
        const updateUser = await userModel.updateUser(id, updatedData);
        res.status(200).json(updateUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await userModel.findAllUsers();
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const getUserById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await userModel.findUserById(id);
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ error: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const createUser = async (req, res) => {
//   const newUser = req.body;
//   try {
//     const userId = await userModel.createUser(newUser);
//     res.status(201).json({ id: userId });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// export const updateUser = async (req, res) => {
//   const { id } = req.params;
//   const updatedData = req.body;
//   try {
//     await userModel.updateUser(id, updatedData);
//     res.status(204).send();
//   } catch (error) {
//     console.error("Error updating user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// export const deleteUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await userModel.deleteUser(id);
//     res.status(204).send();
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
