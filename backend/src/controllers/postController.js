const prisma = require("../config/prisma");


// CREATE POST
const createPost = async (req, res) => {

  try {

    const {
  title,
  description,
  visibility,
  category,
  tags
} = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required"
      });
    }

    // const imageUrl = `/uploads/${req.file.filename}`;

    const fileUrl =
  `/uploads/${req.file.filename}`;

const fileType =
  req.file.mimetype;

    const post = await prisma.post.create({
      data: {

  title,

  description,

  // imageUrl,

  fileUrl,

fileType,

  visibility,

  category,

  tags,

  userId: req.user.id
}
    });

    res.status(201).json({
      message: "Post created successfully",
      post
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// GET USER POSTS
const getMyPosts = async (req, res) => {

  try {

    const posts = await prisma.post.findMany({
      where: {
        userId: req.user.id
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.status(200).json(posts);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

// module.exports = {
//   createPost,
//   getMyPosts
// };

// PUBLIC FEED
// PUBLIC + PRIVATE FEED
const getAllPosts = async (req, res) => {

  try {

    const posts = await prisma.post.findMany({

      where: {

        OR: [

          {
            visibility: "public"
          },

          {
            userId: req.user.id
          }
        ]
      },

      include: {
        user: {
          select: {
            username: true,
            email: true,
            profileImage: true
          }
        }
      },

      orderBy: {
        createdAt: "desc"
      }
    });

    res.status(200).json(posts);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

// DELETE POST
const deletePost = async (
  req,
  res
) => {

  try {

    const post =
      await prisma.post.findUnique({
        where: {
          id: req.params.id
        }
      });

    if (!post) {

      return res.status(404).json({
        message: "Post not found"
      });
    }

    // ONLY OWNER CAN DELETE
    if (
      post.userId !== req.user.id
    ) {

      return res.status(403).json({
        message:
          "Unauthorized"
      });
    }

    await prisma.post.delete({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json({
      message:
        "Post deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Delete failed"
    });
  }
};



module.exports = {
  createPost,
  getMyPosts,
  getAllPosts,
  deletePost
};