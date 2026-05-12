import {
  useEffect,
  useState,
  useRef
} from "react";
import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  FaSearch,
  FaSignOutAlt,
  FaCompass,
  FaUpload,
  FaUser
} from "react-icons/fa";

import API from "../api/axios";

import ProjectModal
from "../components/ProjectModal";

import EditProfileModal
from "../components/EditProfileModal";


function DashboardPage() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [posts, setPosts] = useState([]);

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({

    title: "",

    description: "",

    category: "Design",

    tags: "",

    visibility: "public"
  });

  const [file, setFile] =
  useState(null);

  const [previewUrl,
  setPreviewUrl] =
  useState("");

const [showCamera,
  setShowCamera] =
  useState(false);

const [stream,
  setStream] =
  useState(null);

const [mediaRecorder,
  setMediaRecorder] =
  useState(null);

const [recording,
  setRecording] =
  useState(false);

// const [mediaType,
//   setMediaType] =
//   useState("file");

const [mediaType,
  setMediaType] =
  useState("image");

  const [selectedProject,
    setSelectedProject] =
    useState(null);

  const [showEditProfile,
    setShowEditProfile] =
    useState(false);


  useEffect(() => {

    fetchUser();

    fetchPosts();

  }, []);

  const videoRef = useRef(null);

  // FILTER POSTS
  const filteredPosts = posts.filter((post) => {

  const query = search.toLowerCase();

  // NO SEARCH = ONLY MY POSTS
  if (!query) {

    return post.userId === user?.id;
  }

  // SEARCH = SHOW MATCHING POSTS
  return (

    post.title?.toLowerCase().includes(query)

    ||

    post.description?.toLowerCase().includes(query)

    ||

    post.tags?.toLowerCase().includes(query)

    ||

    post.category?.toLowerCase().includes(query)

    ||

    post.user?.username
      ?.toLowerCase()
      .includes(query)
  );
});


  // FETCH USER
  const fetchUser = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await API.get(
          "/auth/me",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setUser(response.data.user);

    } catch (error) {

      console.log(error);

      localStorage.removeItem("token");

      navigate("/");
    }
  };


  // FETCH POSTS
  const fetchPosts = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await API.get(
          "/posts",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setPosts(response.data);

    } catch (error) {

      console.log(error);
    }
  };


  // INPUT CHANGE
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };


  // FILE CHANGE
  const handleFileChange = (e) => {

  const selectedFile =
    e.target.files[0];

  if (!selectedFile) return;

  setFile(selectedFile);

  setPreviewUrl(
    URL.createObjectURL(selectedFile)
  );
};



const openCamera = async () => {

  try {

    let mediaStream;

    // IMAGE
    if (mediaType === "image") {

      mediaStream =
        await navigator.mediaDevices.getUserMedia({
          video: true
        });
    }

    // VIDEO
    else if (mediaType === "video") {

      mediaStream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
    }

    // AUDIO
    else if (mediaType === "audio") {

      mediaStream =
        await navigator.mediaDevices.getUserMedia({
          audio: true
        });
    }

    setStream(mediaStream);

    setShowCamera(true);

    if (
      videoRef.current &&
      mediaType !== "audio"
    ) {

      videoRef.current.srcObject =
        mediaStream;
    }

  } catch (error) {

    console.log(error);

    alert(
      "Camera or microphone permission denied"
    );
  }
};

const captureImage = () => {

  const canvas =
    document.createElement("canvas");

  canvas.width =
    videoRef.current.videoWidth;

  canvas.height =
    videoRef.current.videoHeight;

  const ctx =
    canvas.getContext("2d");

  ctx.drawImage(
    videoRef.current,
    0,
    0
  );

  canvas.toBlob((blob) => {

    const capturedFile =
      new File(
        [blob],
        `capture-${Date.now()}.png`,
        {
          type: "image/png"
        }
      );

    setFile(capturedFile);

    setPreviewUrl(
      URL.createObjectURL(blob)
    );

  });

  stopStream();
};


const startRecording = () => {

  const chunks = [];

  const recorder =
    new MediaRecorder(stream);

  recorder.ondataavailable =
    (event) => {

      chunks.push(event.data);
    };

  recorder.onstop = () => {

    const blob =
      new Blob(chunks, {
        type:
          mediaType === "audio"
            ? "audio/mp3"
            : "video/webm"
      });

    const recordedFile =
      new File(
        [blob],
        mediaType === "audio"
  ? `audio-${Date.now()}.mp3`
  : `video-${Date.now()}.webm`,
        {
          type: blob.type
        }
      );

    setFile(recordedFile);

    setPreviewUrl(
      URL.createObjectURL(blob)
    );

    stopStream();
  };

  recorder.start();

  setMediaRecorder(recorder);

  setRecording(true);
};

const stopRecording = () => {

  mediaRecorder.stop();

  setRecording(false);
};


const stopStream = () => {

  if (stream) {

    stream.getTracks().forEach(
      (track) => track.stop()
    );
  }

  setShowCamera(false);
};



  // CREATE POST
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      const uploadData =
        new FormData();

      uploadData.append(
        "title",
        formData.title
      );

      uploadData.append(
        "description",
        formData.description
      );

      uploadData.append(
        "category",
        formData.category
      );

      uploadData.append(
        "tags",
        formData.tags
      );

      uploadData.append(
        "visibility",
        formData.visibility
      );

      uploadData.append(
  "file",
  file
);

      await API.post(
        "/posts/create",
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

      setFormData({

        title: "",

        description: "",

        category: "Design",

        tags: "",

        visibility: "public"
      });

      setFile(null);

setPreviewUrl("");
      fetchPosts();

      alert(
        "Work uploaded successfully"
      );

    } catch (error) {

      console.log(error);

      alert("Upload failed");
    }
  };


  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };


  if (showCamera) {

  return (

    <div
      className="
        fixed
        inset-0
        z-50
        bg-black
        flex
        items-center
        justify-center
      "
    >

      <div
        className="
          bg-[#111827]
          p-8
          rounded-3xl
          w-[90%]
          max-w-4xl
        "
      >

        {
          mediaType !== "audio" && (

            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="
                w-full
                rounded-2xl
                mb-6
              "
            />
          )
        }

        {
          mediaType === "audio" && (

            <div
              className="
                h-[300px]
                flex
                items-center
                justify-center
                text-5xl
              "
            >

              🎙️ Audio Recorder

            </div>
          )
        }

        <div className="flex gap-4">

          {
            mediaType === "image" ? (

              <button
                onClick={captureImage}
                className="
                  flex-1
                  bg-purple-600
                  py-4
                  rounded-2xl
                "
              >

                Capture

              </button>

            ) : (

              <>
                {
                  !recording ? (

                    <button
                      onClick={startRecording}
                      className="
                        flex-1
                        bg-red-600
                        py-4
                        rounded-2xl
                      "
                    >

                      Start Recording

                    </button>

                  ) : (

                    <button
                      onClick={stopRecording}
                      className="
                        flex-1
                        bg-green-600
                        py-4
                        rounded-2xl
                      "
                    >

                      Stop Recording

                    </button>
                  )
                }
              </>
            )
          }

          <button
            onClick={stopStream}
            className="
              flex-1
              bg-black
              border
              border-gray-700
              py-4
              rounded-2xl
            "
          >

            Cancel

          </button>

        </div>

      </div>

    </div>
  );
}


  return (

    <>

      {/* PROJECT MODAL */}
      <ProjectModal
  project={selectedProject}
  currentUser={user}
  onClose={() =>
    setSelectedProject(null)
  }
  onDelete={(deletedId) => {

    setPosts((prev) =>
      prev.filter(
        (p) => p.id !== deletedId
      )
    );
  }}
/>


      {/* EDIT PROFILE MODAL */}
      {
        showEditProfile && (

          <EditProfileModal

            user={user}

            onClose={() =>
              setShowEditProfile(false)
            }

            onProfileUpdated={(
              updatedUser
            ) =>
              setUser(updatedUser)
            }
          />
        )
      }


      <div className="min-h-screen">


        {/* NAVBAR */}
        <div
          className="
            border-b
            border-gray-800
            px-8
            py-5
            flex
            items-center
            justify-between
            backdrop-blur-md
          "
        >

          {/* LOGO */}
          <div>

            <h1
              className="
                text-3xl
                font-bold
              "
            >

              UXverse

            </h1>

          </div>


          {/* SEARCH */}
          <div
            className="
              hidden md:flex
              items-center
              bg-[#111827]
              border
              border-gray-700
              rounded-2xl
              px-5
              py-3
              w-[400px]
              relative
            "
          >

            <FaSearch
              className="
                text-gray-500
              "
            />


            <div
              className="
                relative
                w-full
              "
            >

              <input
                type="text"
                placeholder="Search creators, tags, projects..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="
                  bg-transparent
                  outline-none
                  ml-3
                  w-full
                  text-white
                "
              />

            </div>

          </div>


          {/* RIGHT */}
          <div
            className="
              flex
              items-center
              gap-5
            "
          >

            {user && (

              <div
                className="
                  hidden
                  md:flex
                  items-center
                  gap-4
                "
              >

                {/* AVATAR */}
                <div
                  onClick={() =>
                    setShowEditProfile(true)
                  }
                  className="
                    w-14
                    h-14
                    rounded-full
                    overflow-hidden
                    bg-black
                    border
                    border-gray-700
                    cursor-pointer
                    hover:border-purple-500
                    transition
                  "
                >

                  {
                    user.profileImage ? (

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

                      <div
                        className="
                          w-full
                          h-full
                          flex
                          items-center
                          justify-center
                          text-gray-500
                        "
                      >

                        <FaUser />

                      </div>
                    )
                  }

                </div>


                {/* USER INFO */}
                <div>

                  <p
                    className="
                      font-semibold
                    "
                  >

                    {
                      user.fullName ||
                      user.username
                    }

                  </p>

                  <p
                    className="
                      text-sm
                      text-gray-400
                    "
                  >

                    {user.email}

                  </p>

                </div>

              </div>
            )}


            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="
                bg-purple-600
                hover:bg-purple-700
                transition
                px-5
                py-3
                rounded-2xl
                flex
                items-center
                gap-3
              "
            >

              <FaSignOutAlt />

              Logout

            </button>


            {/* EXPLORE */}
            <Link
              to="/explore"
              className="
                bg-black
                border
                border-gray-700
                hover:border-purple-500
                transition
                px-5
                py-3
                rounded-2xl
                flex
                items-center
                gap-3
              "
            >

              <FaCompass />

              Explore

            </Link>

          </div>

        </div>


        {/* MAIN CONTENT */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-8
            p-8
          "
        >

          {/* LEFT PANEL */}
          <div
            className="
              bg-[#111827]
              border
              border-gray-800
              rounded-3xl
              p-8
              h-fit
            "
          >

            <div
              className="
                flex
                items-center
                gap-3
                mb-8
              "
            >

              <FaUpload
                className="
                  text-purple-400
                  text-2xl
                "
              />

              <h2
                className="
                  text-2xl
                  font-bold
                "
              >

                Post Your Work

              </h2>

            </div>


            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={formData.title}
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


              <textarea
                name="description"
                placeholder="Project Description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="
                  w-full
                  bg-black
                  border
                  border-gray-700
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  resize-none
                  focus:border-purple-500
                "
              />


              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="
                  w-full
                  bg-black
                  border
                  border-[#2a3555]
                  rounded-2xl
                  px-5
                  py-4
                  text-white
                  outline-none
                  focus:border-purple-500
                  transition
                "
              >

                <option value="Design">Design</option>

                <option value="Development">Development</option>

                <option value="Photography">Photography</option>

                <option value="3D">3D</option>

                <option value="Branding">Branding</option>

                <option value="UI/UX">UI/UX</option>

              </select>


              <input
                type="text"
                name="tags"
                placeholder="Tags (ui, dark, mobile)"
                value={formData.tags}
                onChange={handleChange}
                className="
                  w-full
                  bg-black
                  border
                  border-[#2a3555]
                  rounded-2xl
                  px-5
                  py-4
                  text-white
                  placeholder:text-gray-500
                  outline-none
                  focus:border-purple-500
                  transition
                "
              />


              <div className="flex gap-4">

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      visibility: "public"
                    })
                  }
                  className={`
                    flex-1
                    py-3
                    rounded-2xl
                    border
                    transition
                    ${
                      formData.visibility === "public"
                        ? "bg-purple-600 border-purple-600"
                        : "bg-black border-[#2a3555]"
                    }
                  `}
                >
                  Public
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      visibility: "private"
                    })
                  }
                  className={`
                    flex-1
                    py-3
                    rounded-2xl
                    border
                    transition
                    ${
                      formData.visibility === "private"
                        ? "bg-purple-600 border-purple-600"
                        : "bg-black border-[#2a3555]"
                    }
                  `}
                >
                  Private
                </button>

              </div>




              {/* MEDIA TYPE */}
<select
  value={mediaType}
  onChange={(e) =>
    setMediaType(e.target.value)
  }
  className="
    w-full
    bg-black
    border
    border-[#2a3555]
    rounded-2xl
    px-5
    py-4
    text-white
    outline-none
    focus:border-purple-500
  "
>

  <option value="image">
    Image
  </option>

  <option value="video">
    Video
  </option>

  <option value="audio">
    Audio
  </option>

  <option value="document">
    Document / PDF
  </option>

  <option value="archive">
    ZIP / Archive
  </option>

</select>


{/* CAMERA / RECORD BUTTONS */}
{
  (
    mediaType === "image" ||
    mediaType === "video" ||
    mediaType === "audio"
  ) && (

    <div className="grid grid-cols-2 gap-4">

      <button
        type="button"
        onClick={openCamera}
        className="
          bg-[#111827]
          border
          border-purple-500
          rounded-2xl
          py-4
          hover:bg-purple-600
          transition
        "
      >

        {
          mediaType === "image"

            ? "Open Camera"

            : mediaType === "video"

            ? "Record Video"

            : "Record Audio"
        }

      </button>


      <label
        className="
          bg-black
          border
          border-[#2a3555]
          rounded-2xl
          py-4
          text-center
          cursor-pointer
          hover:border-purple-500
          transition
        "
      >

        Browse Device

        <input
          type="file"
          accept={
            mediaType === "image"

              ? "image/*"

              : mediaType === "video"

              ? "video/*"

              : "audio/*"
          }
          onChange={handleFileChange}
          className="hidden"
        />

      </label>

    </div>
  )
}


{/* DOCUMENT + ARCHIVE */}
{
  (
    mediaType === "document" ||
    mediaType === "archive"
  ) && (

    <label
      className="
        w-full
        min-h-[220px]
        bg-black
        border-2
        border-dashed
        border-gray-700
        hover:border-purple-500
        rounded-3xl
        flex
        flex-col
        items-center
        justify-center
        cursor-pointer
        transition
        overflow-hidden
        relative
      "
    >

      <input
        type="file"
        accept={
          mediaType === "document"

            ? ".pdf,.doc,.docx,.txt"

            : ".zip,.rar"
        }
        onChange={handleFileChange}
        className="hidden"
      />


      {
        file ? (

          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-5
            "
          >

            <p className="text-7xl">
              {
                mediaType === "document"
                  ? "📄"
                  : "🗂️"
              }
            </p>

            <p className="text-lg">
              {file.name}
            </p>

          </div>

        ) : (

          <>

            <FaUpload
              className="
                text-5xl
                text-purple-400
              "
            />

            <p
              className="
                mt-5
                text-lg
                font-semibold
              "
            >

              Click to upload media

            </p>

            <p
              className="
                mt-2
                text-gray-500
              "
            >

              PDFs, DOCs, ZIPs & more

            </p>

          </>
        )
      }

    </label>
  )
}


{/* IMAGE PREVIEW */}
{
  mediaType === "image" &&
  previewUrl && (

    <div
      className="
        relative
        w-full
        h-[250px]
        rounded-3xl
        overflow-hidden
        border
        border-gray-700
      "
    >

      <img
        src={previewUrl || ""}
        alt="Preview"
        className="
          w-full
          h-full
          object-cover
        "
      />

    </div>
  )
}


{/* VIDEO PREVIEW */}
{
  mediaType === "video" &&
  previewUrl && (

    <video
      src={previewUrl || ""}
      controls
      className="
        w-full
        rounded-3xl
        border
        border-gray-700
      "
    />
  )
}


{/* AUDIO PREVIEW */}
{
  mediaType === "audio" &&
  previewUrl && (

    <div
      className="
        bg-black
        border
        border-gray-700
        rounded-3xl
        p-10
        flex
        flex-col
        items-center
        gap-6
      "
    >

      <div className="text-7xl">
        🎵
      </div>

      <audio
        controls
        src={previewUrl || ""}
      />

    </div>
  )
}


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

                Upload Work

              </button>

            </form>

          </div>


          {/* RIGHT PANEL */}
          <div
            className="
              lg:col-span-2
            "
          >

            <h2
  className="
    text-3xl
    font-bold
    mb-8
  "
>

  {
    search
      ? "Search Results"
      : "My Uploaded Works"
  }

</h2>


            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-8
              "
            >

              {
                filteredPosts.map((post) => (

                  <div
                    key={post.id}
                    onClick={() =>
                      setSelectedProject(post)
                    }
                    className="
                      bg-[#111827]
                      border
                      border-gray-800
                      rounded-3xl
                      overflow-hidden
                      hover:border-purple-500
                      hover:-translate-y-2
                      hover:shadow-purple-500/20
                      hover:shadow-2xl
                      transition-all
                      duration-300
                    "
                  >

{
  (
    post.fileType === "image"
  ) && (

    <img
      src={`http://localhost:5000${
        post.fileUrl || post.imageUrl
      }`}
      alt={post.title}
      className="
        w-full
        h-[260px]
        object-cover
      "
    />
  )
}

{
  post.fileType === "video" && (

    <video
      src={`http://localhost:5000${post.fileUrl}`}
      className="
        w-full
        h-[260px]
        object-cover
        bg-black
      "
      controls
    />
  )
}

{
  post.fileType === "audio" && (

    <div
      className="
        w-full
        h-[260px]
        bg-black
        flex
        flex-col
        items-center
        justify-center
        gap-5
      "
    >

      <div className="text-6xl">
        🎵
      </div>

      <audio
        controls
        src={`http://localhost:5000${post.fileUrl}`}
      />

    </div>
  )
}

{
  post.fileType === "document" && (

    <div
      className="
        w-full
        h-[260px]
        bg-black
        flex
        flex-col
        items-center
        justify-center
        gap-5
      "
    >

      <div className="text-7xl">
        📄
      </div>

      <p
        className="
          text-gray-300
          px-5
          text-center
        "
      >
        PDF / Document
      </p>

    </div>
  )
}

{
  post.fileType === "archive" && (

    <div
      className="
        w-full
        h-[260px]
        bg-black
        flex
        flex-col
        items-center
        justify-center
        gap-5
      "
    >

      <div className="text-7xl">
        🗂️
      </div>

      <p className="text-gray-300">
        ZIP / Archive
      </p>

    </div>
  )
}

                    <div className="p-6">

                      <h3
                        className="
                          text-2xl
                          font-bold
                        "
                      >

                        {post.title}

                      </h3>

                      <p
                        className="
                          mt-3
                          text-gray-400
                          leading-relaxed
                        "
                      >

                        {post.description}

                      </p>

                    </div>

                  </div>
                ))
              }

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

export default DashboardPage;