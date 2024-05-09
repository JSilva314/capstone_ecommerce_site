const prisma = require('../client');
const bcrypt = require('bcrypt');

const createUser = async ({ email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
};

const getUser = async ({ email, password }) => {
  if (!email || !password) {
    return;
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) return;
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) return;
    delete user.password;
    return user;
  } catch (err) {
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
  getUser,
  getUserByEmail,
};