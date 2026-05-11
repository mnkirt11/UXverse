const prisma = require("../config/prisma");


// SEARCH USERS
const searchUsers = async (req, res) => {

  try {

    const { query } = req.query;

    if (!query) {
      return res.status(200).json([]);
    }

    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: query,
          mode: "insensitive"
        }
      },
      select: {
        id: true,
        username: true,
        email: true
      },
      take: 10
    });

    res.status(200).json(users);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// PUBLIC PROFILE
const getUserProfile = async (req, res) => {

  try {

    const { username } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        username
      },
      include: {
        posts: {
          orderBy: {
            createdAt: "desc"
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(user);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  searchUsers,
  getUserProfile
};