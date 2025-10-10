import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../models/users.json');

const readUsersFromFile = () => {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

const writeUsersToFile = (users) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
};

export const register = async (req, res) => {
    try {
        const users = readUsersFromFile();
        const { firstname, lastname, email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: uuidv4(), firstname, lastname, email, username, password: hashedPassword };
        users.push(newUser);
        writeUsersToFile(users);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
}

export const login = async (req, res) => {
    try {
        const users = readUsersFromFile();
        const { username, password } = req.body;
        const user = users.find((u) => u.username === username);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login user' });
    }
};

export const getAllUsers = (req, res) => {
  try {
    const users = readUsersFromFile();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read users' });
  }
};

export const getUserById = (req, res) => {
  try {
    const users = readUsersFromFile();
    const user = users.find((u) => u.id === req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read users' });
  }
};

export const updateUser = (req, res) => {
  try {
    const users = readUsersFromFile();
    const user = users.find((u) => u.id === req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const updatedUser = { ...user, ...req.body };
    users[users.indexOf(user)] = updatedUser;
    writeUsersToFile(users);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// export const createUser = (req, res) => {
//   try {
//     const users = readUsersFromFile();
//     const newUser = { id: uuidv4(), ...req.body };
//     users.push(newUser);
//     writeUsersToFile(users);
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create user' });
//   }
// };
