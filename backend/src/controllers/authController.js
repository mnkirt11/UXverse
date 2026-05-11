// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");

// // const prisma = require("../config/prisma");


// // SIGNUP
// const signup = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // check existing user
//     const existingUser = await prisma.user.findFirst({
//       where: {
//         OR: [
//           { email },
//           { username }
//         ]
//       }
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         message: "User already exists"
//       });
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // create user
//     const user = await prisma.user.create({
//       data: {
//         username,
//         email,
//         password: hashedPassword
//       }
//     });

//     // create token
//     // const token = jwt.sign(
//     //   { userId: user.id },
//     //   process.env.JWT_SECRET,
//     //   { expiresIn: "7d" }
//     // );

//     const token = jwt.sign(

//   {
//     id: user.id
//   },

//   process.env.JWT_SECRET,

//   {
//     expiresIn: "7d"
//   }
// );

//     res.status(201).json({
//       message: "User created successfully",
//       token,
//       user: {
//         id: user.id,
//         username: user.username,
//         email: user.email
//       }
//     });

//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       message: "Server error"
//     });
//   }
// };


// // LOGIN
// // const login = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     // find user
// //     const user = await prisma.user.findUnique({

// //   where: {
// //     id: req.user.id
// //   },

// //   select: {
// //     id: true,
// //     username: true,
// //     email: true,
// //     fullName: true,
// //     bio: true,
// //     location: true,
// //     phoneNumber: true,
// //     profileImage: true
// //   }
// // });

// //     if (!user) {
// //       return res.status(400).json({
// //         message: "Invalid credentials"
// //       });
// //     }

// //     // compare password
// //     const isMatch = await bcrypt.compare(
// //       password,
// //       user.password
// //     );

// //     if (!isMatch) {
// //       return res.status(400).json({
// //         message: "Invalid credentials"
// //       });
// //     }

// //     // generate token
// //     const token = jwt.sign(
// //       { userId: user.id },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "7d" }
// //     );

// //     res.status(200).json({
// //       message: "Login successful",
// //       token,
// //       user: {
// //         id: user.id,
// //         username: user.username,
// //         email: user.email
// //       }
// //     });

// //   } catch (error) {
// //     console.log(error);

// //     res.status(500).json({
// //       message: "Server error"
// //     });
// //   }
// // };

// const bcrypt = require("bcryptjs");

// const jwt = require("jsonwebtoken");

// const prisma = require("../config/prisma");


// const login = async (req, res) => {

//   try {

//     const {
//       email,
//       password
//     } = req.body;


//     // FIND USER
//     const user =
//       await prisma.user.findUnique({

//         where: {
//           email
//         }
//       });


//     // CHECK USER
//     if (!user) {

//       return res.status(404).json({
//         message: "User not found"
//       });
//     }


//     // CHECK PASSWORD
//     const isMatch =
//       await bcrypt.compare(
//         password,
//         user.password
//       );


//     if (!isMatch) {

//       return res.status(400).json({
//         message: "Invalid credentials"
//       });
//     }


//     // CREATE TOKEN
//     const token = jwt.sign(

//       {
//         id: user.id
//       },

//       process.env.JWT_SECRET,

//       {
//         expiresIn: "7d"
//       }
//     );


//     // RESPONSE
//     res.status(200).json({

//       token,

//       user: {

//         id: user.id,

//         username: user.username,

//         email: user.email,

//         fullName: user.fullName,

//         bio: user.bio,

//         location: user.location,

//         phoneNumber:
//           user.phoneNumber,

//         profileImage:
//           user.profileImage
//       }
//     });

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       message: "Server error"
//     });
//   }
// };

// module.exports = {
//   signup,
//   login
// };


// const jwt = require("jsonwebtoken");

// const prisma = require("../config/prisma");


// const authMiddleware = async (
//   req,
//   res,
//   next
// ) => {

//   try {

//     // GET TOKEN
//     const authHeader =
//       req.headers.authorization;


//     if (
//       !authHeader ||
//       !authHeader.startsWith("Bearer ")
//     ) {

//       return res.status(401).json({
//         message: "Unauthorized"
//       });
//     }


//     // EXTRACT TOKEN
//     const token =
//       authHeader.split(" ")[1];


//     // VERIFY TOKEN
//     const decoded = jwt.verify(

//       token,

//       process.env.JWT_SECRET
//     );


//     // FIND USER
//     const user =
//       await prisma.user.findUnique({

//         where: {
//           id: decoded.id
//         }
//       });


//     if (!user) {

//       return res.status(401).json({
//         message: "User not found"
//       });
//     }


//     req.user = user;

//     next();

//   } catch (error) {

//     console.log(error);

//     res.status(401).json({
//       message: "Unauthorized"
//     });
//   }
// };

// module.exports = {
//   signup,
//   login,
//   getMe
// };

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const prisma = require("../config/prisma");


// SIGNUP
const signup = async (req, res) => {

  try {

    const {
      username,
      email,
      password
    } = req.body;


    // CHECK EXISTING USER
    const existingUser =
      await prisma.user.findFirst({

        where: {
          OR: [
            { email },
            { username }
          ]
        }
      });


    if (existingUser) {

      return res.status(400).json({
        message:
          "User already exists"
      });
    }


    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);


    // CREATE USER
    const user =
      await prisma.user.create({

        data: {

          username,

          email,

          password:
            hashedPassword
        }
      });


    // CREATE TOKEN
    const token = jwt.sign(

      {
        id: user.id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }
    );


    res.status(201).json({

      token,

      user: {

        id: user.id,

        username:
          user.username,

        email:
          user.email
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// LOGIN
const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;


    // FIND USER
    const user =
      await prisma.user.findUnique({

        where: {
          email
        }
      });


    // CHECK USER
    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });
    }


    // CHECK PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    if (!isMatch) {

      return res.status(400).json({
        message:
          "Invalid credentials"
      });
    }


    // CREATE TOKEN
    const token = jwt.sign(

      {
        id: user.id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }
    );


    // RESPONSE
    res.status(200).json({

      token,

      user: {

        id: user.id,

        username:
          user.username,

        email:
          user.email,

        fullName:
          user.fullName,

        bio:
          user.bio,

        location:
          user.location,

        phoneNumber:
          user.phoneNumber,

        profileImage:
          user.profileImage
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


// GET CURRENT USER
const getMe = async (req, res) => {

  try {

    const user =
      await prisma.user.findUnique({

        where: {
          id: req.user.id
        },

        select: {

          id: true,

          username: true,

          email: true,

          fullName: true,

          bio: true,

          location: true,

          phoneNumber: true,

          profileImage: true
        }
      });


    res.status(200).json({
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};


module.exports = {
  signup,
  login,
  getMe
};