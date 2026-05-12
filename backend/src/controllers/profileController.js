// const prisma = require("../config/prisma");


// // UPDATE PROFILE
// const updateProfile = async (req, res) => {

//   try {

//     const {
//       fullName,
//       bio,
//       location,
//       phoneNumber
//     } = req.body;


//     let profileImage = null;

//     if (req.file) {

//       profileImage =
//         `/uploads/${req.file.filename}`;
//     }


//     const updatedUser =
//       await prisma.user.update({

//         where: {
//           id: req.user.id
//         },

//         data: {

//           fullName,

//           bio,

//           location,

//           phoneNumber,

//           ...(profileImage && {
//             profileImage
//           })
//         }
//       });


//     res.status(200).json(updatedUser);

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       message: "Server error"
//     });
//   }
// };

// module.exports = {
//   updateProfile
// };


const prisma = require("../config/prisma");


// UPDATE PROFILE
const updateProfile = async (
  req,
  res
) => {

  try {

    const {
      fullName,
      bio,
      location,
      phoneNumber
    } = req.body;


    // IMAGE PATH
    let profileImage = null;

    if (req.file) {

      profileImage =
        `/uploads/${req.file.filename}`;
    }


    // UPDATE USER
    const updatedUser =
      await prisma.user.update({

        where: {
          id: req.user.id
        },

        data: {

          fullName,

          bio,

          location,

          phoneNumber,

          ...(profileImage && {
            profileImage
          })
        }
      });


    res.status(200).json({

      message:
        "Profile updated",

      user: updatedUser
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Profile update failed"
    });
  }
};

module.exports = {
  updateProfile
};