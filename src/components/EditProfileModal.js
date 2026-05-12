import {
  useState
} from "react";

import {
  FaTimes,
  FaUser
} from "react-icons/fa";

import API from "../api/axios";


function EditProfileModal({
  user,
  onClose,
  onProfileUpdated
}) {

  const [formData, setFormData] =
    useState({

      fullName:
        user?.fullName || "",

      bio:
        user?.bio || "",

      location:
        user?.location || "",

      phoneNumber:
        user?.phoneNumber || ""
    });

  const [profileImage, setProfileImage] =
    useState(null);


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      const uploadData = new FormData();

      uploadData.append(
        "fullName",
        formData.fullName
      );

      uploadData.append(
        "bio",
        formData.bio
      );

      uploadData.append(
        "location",
        formData.location
      );

      uploadData.append(
        "phoneNumber",
        formData.phoneNumber
      );

      if (profileImage) {

        uploadData.append(
          "profileImage",
          profileImage
        );
      }


      const response = await API.put(

        "/profile/update",

        uploadData,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data"
          }
        }
      );


      onProfileUpdated(response.data.user);

      onClose();

    } catch (error) {

      console.log(error);

      alert("Profile update failed");
    }
  };


  return (

    <div
      className="
        fixed
        inset-0
        bg-black/80
        backdrop-blur-md
        z-50
        flex
        items-center
        justify-center
        p-6
      "
    >

      {/* OVERLAY */}
      <div
        className="
          absolute
          inset-0
        "
        onClick={onClose}
      />


      {/* MODAL */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-2xl
          bg-[#111827]
          border
          border-gray-800
          rounded-3xl
          p-10
        "
      >

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="
            absolute
            top-5
            right-5
            w-12
            h-12
            rounded-full
            bg-black/50
            hover:bg-purple-600
            transition
            flex
            items-center
            justify-center
          "
        >

          <FaTimes />

        </button>


        <h2
          className="
            text-4xl
            font-bold
            mb-10
          "
        >

          Edit Profile

        </h2>


        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* AVATAR */}
          <label
            className="
              w-40
              h-40
              rounded-full
              bg-black
              border-2
              border-dashed
              border-gray-700
              hover:border-purple-500
              flex
              items-center
              justify-center
              cursor-pointer
              overflow-hidden
            "
          >

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setProfileImage(
                  e.target.files[0]
                )
              }
            />

            {
              profileImage ? (

                <img
                  src={
                    URL.createObjectURL(
                      profileImage
                    )
                  }
                  alt="Avatar"
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

              ) : (

                user?.profileImage ? (

                  <img
                    src={
                      `http://localhost:5000${user.profileImage}`
                    }
                    alt="Avatar"
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                ) : (

                  <FaUser
                    className="
                      text-5xl
                      text-gray-500
                    "
                  />
                )
              )
            }

          </label>


          {/* FULL NAME */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="
              w-full
              bg-black
              border
              border-gray-700
              rounded-2xl
              px-5
              py-4
              outline-none
              focus:border-purple-500
            "
          />


          {/* BIO */}
          <textarea
            name="bio"
            placeholder="Your bio..."
            rows="5"
            value={formData.bio}
            onChange={handleChange}
            className="
              w-full
              bg-black
              border
              border-gray-700
              rounded-2xl
              px-5
              py-4
              outline-none
              focus:border-purple-500
            "
          />


          {/* LOCATION */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="
              w-full
              bg-black
              border
              border-gray-700
              rounded-2xl
              px-5
              py-4
              outline-none
              focus:border-purple-500
            "
          />


          {/* PHONE */}
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="
              w-full
              bg-black
              border
              border-gray-700
              rounded-2xl
              px-5
              py-4
              outline-none
              focus:border-purple-500
            "
          />


          <button
            type="submit"
            className="
              w-full
              bg-purple-600
              hover:bg-purple-700
              py-4
              rounded-2xl
              font-semibold
              transition
            "
          >

            Save Profile

          </button>

        </form>

      </div>

    </div>
  );
}

export default EditProfileModal;