// const jwt = require("jsonwebtoken");

// const prisma = require("../config/prisma");

// const authMiddleware = async (req, res, next) => {
//   try {

//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         message: "Unauthorized"
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     const user = await prisma.user.findUnique({
//       where: {
//         id: decoded.userId
//       }
//     });

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
//       message: "Invalid token"
//     });
//   }
// };

// module.exports = authMiddleware;


const jwt = require("jsonwebtoken");

const prisma = require("../config/prisma");


const authMiddleware = async (
  req,
  res,
  next
) => {

  try {

    // GET HEADER
    const authHeader =
      req.headers.authorization;


    // CHECK HEADER
    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {

      return res.status(401).json({
        message: "Unauthorized"
      });
    }


    // EXTRACT TOKEN
    const token =
      authHeader.split(" ")[1];


    // VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );


    console.log("DECODED TOKEN:", decoded);


    // SUPPORT MULTIPLE TOKEN FORMATS
    const userId =
      decoded.id ||
      decoded.userId ||
      decoded.user?.id;


    // CHECK USER ID
    if (!userId) {

      return res.status(401).json({
        message: "Invalid token"
      });
    }


    // FIND USER
    const user =
      await prisma.user.findUnique({

        where: {
          id: userId
        }
      });


    // CHECK USER
    if (!user) {

      return res.status(401).json({
        message: "User not found"
      });
    }


    // ATTACH USER
    req.user = user;

    next();

  } catch (error) {

    console.log(error);

    res.status(401).json({
      message: "Unauthorized"
    });
  }
};

module.exports = authMiddleware;