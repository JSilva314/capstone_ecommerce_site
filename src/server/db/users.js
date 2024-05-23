const prisma = require("../client");
const bcrypt = require("bcrypt");

const createUser = async ({
  email,
  password,
  fullName,
  username,
  address,
  phone,
}) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        username,
        address,
        phone,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
};

const getAllUsers = async () => {
  try {
    const users = await prisma.users.findMany();
    
    return users;
  } catch (err) {
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
};

const getUserByUsername = async (username) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        username,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserByEmail,
  getUserByUsername,
};
