// import {
//   FaTimes
// } from "react-icons/fa";


// function ProjectModal({
//   project,
//   onClose
// }) {

//   if (!project) return null;


//   return (

//     <div
//       className="
//         fixed
//         inset-0
//         bg-black/80
//         backdrop-blur-md
//         z-50
//         flex
//         items-center
//         justify-center
//         p-6
//       "
//     >

//       {/* CLOSE OVERLAY */}
//       <div
//         className="
//           absolute
//           inset-0
//         "
//         onClick={onClose}
//       />


//       {/* MODAL CONTENT */}
//       <div
//         className="
//           relative
//           z-10
//           w-full
//           max-w-6xl
//           bg-[#111827]
//           border
//           border-gray-800
//           rounded-3xl
//           overflow-hidden
//           shadow-2xl
//           animate-fadeIn
//         "
//       >

//         {/* CLOSE BUTTON */}
//         <button
//           onClick={onClose}
//           className="
//             absolute
//             top-5
//             right-5
//             z-20
//             bg-black/60
//             hover:bg-purple-600
//             transition
//             w-12
//             h-12
//             rounded-full
//             flex
//             items-center
//             justify-center
//           "
//         >

//           <FaTimes />

//         </button>


//         <div
//           className="
//             grid
//             grid-cols-1
//             lg:grid-cols-2
//           "
//         >

//           {/* IMAGE */}
//           {/* <div
//             className="
//               bg-black
//               flex
//               items-center
//               justify-center
//               min-h-[700px]
//             "
//           >

//             <img
//               src={`http://localhost:5000${project.imageUrl}`}
//               alt={project.title}
//               className="
//                 w-full
//                 h-full
//                 object-contain
//               "
//             />

//           </div> */}

//           {/* MEDIA */}
//           <div
//   className="
//     w-full
//     lg:w-1/2
//     bg-black
//     flex
//     items-center
//     justify-center
//     overflow-hidden
//   "
// >
// {/* 
//   {
//     project.fileType === "image" && (

//       <img
//         src={`http://localhost:5000${project.fileUrl}`}
//         alt={project.title}
//         className="
//           w-full
//           h-full
//           object-contain
//         "
//       />
//     )
//   }

//   {
//     project.fileType === "video" && (

//       <video
//         controls
//         className="
//           w-full
//           h-full
//         "
//       >
//         <source
//           src={`http://localhost:5000${project.fileUrl}`}
//         />
//       </video>
//     )
//   }

//   {
//     project.fileType === "audio" && (

//       <div
//         className="
//           flex
//           flex-col
//           items-center
//           justify-center
//           gap-8
//           p-10
//         "
//       >

//         <div className="text-8xl">
//           🎵
//         </div>

//         <audio
//           controls
//           src={`http://localhost:5000${project.fileUrl}`}
//         />

//       </div>
//     )
//   }

//   {
//     project.fileType === "document" && (

//       <iframe
//         src={`http://localhost:5000${project.fileUrl}`}
//         title="PDF Viewer"
//         className="
//           w-full
//           h-full
//           bg-white
//         "
//       />
//     )
//   }

//   {
//     project.fileType === "archive" && (

//       <div
//         className="
//           flex
//           flex-col
//           items-center
//           justify-center
//           gap-8
//         "
//       >

//         <div className="text-8xl">
//           🗂️
//         </div>

//         <a
//           href={`http://localhost:5000${project.fileUrl}`}
//           download
//           className="
//             bg-purple-600
//             px-6
//             py-3
//             rounded-xl
//           "
//         >

//           Download ZIP

//         </a>

//       </div>
//     )
//   } */}


//   {/* IMAGE */}
// {
//   (
//     project.fileType === "image" ||
//     project.imageUrl
//   ) && (

//     <img
//       src={`http://localhost:5000${
//         project.fileUrl ||
//         project.imageUrl
//       }`}
//       alt={project.title}
//       className="
//         w-full
//         h-full
//         object-cover
//       "
//     />
//   )
// }


// {/* VIDEO */}
// {
//   project.fileType === "video" && (

//     <video
//       controls
//       autoPlay
//       className="
//         w-full
//         h-full
//         object-cover
//       "
//     >

//       <source
//         src={`http://localhost:5000${project.fileUrl}`}
//       />

//     </video>
//   )
// }


// {/* AUDIO */}
// {
//   project.fileType === "audio" && (

//     <div
//       className="
//         w-full
//         h-full
//         flex
//         items-center
//         justify-center
//         bg-black
//       "
//     >

//       <audio
//         controls
//         className="w-[80%]"
//       >

//         <source
//           src={`http://localhost:5000${project.fileUrl}`}
//         />

//       </audio>

//     </div>
//   )
// }


// {/* DOCUMENT */}
// {
//   project.fileType === "document" && (

//     <iframe
//       src={`http://localhost:5000${project.fileUrl}`}
//       title="PDF Viewer"
//       className="
//         w-full
//         h-full
//         bg-white
//       "
//     />
//   )
// }


// {/* ARCHIVE */}
// {
//   project.fileType === "archive" && (

//     <div
//       className="
//         w-full
//         h-full
//         flex
//         flex-col
//         items-center
//         justify-center
//         bg-black
//         gap-6
//       "
//     >

//       <div className="text-8xl">
//         🗂️
//       </div>

//       <a
//         href={`http://localhost:5000${project.fileUrl}`}
//         download
//         className="
//           bg-purple-600
//           px-6
//           py-3
//           rounded-2xl
//         "
//       >

//         Download Archive

//       </a>

//     </div>
//   )
// }

// </div>


//           {/* DETAILS */}
//           <div
//             className="
//               p-10
//               flex
//               flex-col
//               justify-center
//             "
//           >

//             {
//               project.user && (

//                 <p
//                   className="
//                     text-purple-400
//                     text-lg
//                   "
//                 >

//                   @{project.user.username}

//                 </p>
//               )
//             }


//             <h2
//               className="
//                 text-5xl
//                 font-bold
//                 mt-4
//               "
//             >

//               {project.title}

//             </h2>


//             <p
//               className="
//                 mt-8
//                 text-gray-400
//                 text-lg
//                 leading-relaxed
//               "
//             >

//               {project.description}

//             </p>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default ProjectModal;



import {
  FaTimes,
  FaTrash,
  FaShareAlt,
  FaDownload
} from "react-icons/fa";

import API from "../api/axios";


function ProjectModal({
  project,
  onClose,
  currentUser,
  onDelete
}) {

  if (!project) return null;


  const fileUrl =
    `http://localhost:5000${
      project.fileUrl || project.imageUrl
    }`;


  const isOwner =
    currentUser?.id === project.userId;


  // SHARE
  const handleShare = async () => {

    try {

      await navigator.share({

        title: project.title,

        text: project.description,

        url: window.location.href
      });

    } catch (error) {

      console.log(error);
    }
  };


  // DELETE
  const handleDelete = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await API.delete(
        `/posts/${project.id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      if (onDelete) {

        onDelete(project.id);
      }

      onClose();

    } catch (error) {

      console.log(error);

      alert("Delete failed");
    }
  };


  return (

    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/80
        backdrop-blur-md
        flex
        items-center
        justify-center
        p-8
      "
    >

      <div
        className="
          relative
          bg-[#0f172a]
          border
          border-gray-800
          rounded-3xl
          overflow-hidden
          w-full
          max-w-6xl
          max-h-[90vh]
          grid
          grid-cols-1
          lg:grid-cols-2
        "
      >

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="
            absolute
            top-5
            right-5
            z-50
            w-12
            h-12
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            hover:bg-red-500
            transition
          "
        >

          <FaTimes />

        </button>


        {/* LEFT MEDIA */}
        <div
          className="
            bg-black
            flex
            items-center
            justify-center
            min-h-[500px]
            overflow-hidden
          "
        >

          {/* IMAGE */}
          {
            (
              project.fileType === "image" ||
              project.imageUrl
            ) && (

              <img
                src={fileUrl}
                alt={project.title}
                className="
                  w-full
                  h-full
                  object-contain
                "
              />
            )
          }


          {/* VIDEO */}
          {
            project.fileType === "video" && (

              <video
                src={fileUrl}
                controls
                autoPlay
                className="
                  w-full
                  h-full
                  object-contain
                "
              />
            )
          }


          {/* AUDIO */}
          {
            project.fileType === "audio" && (

              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-8
                  p-10
                "
              >

                <div className="text-8xl">
                  🎵
                </div>

                <audio
  controls
  autoPlay
  className="w-[350px]"
  src={fileUrl}
/>

              </div>
            )
          }


          {/* PDF / DOCUMENT */}
          {
            project.fileType ===
            "document" && (

              <iframe
                src={fileUrl}
                title="Document Viewer"
                className="
                  w-full
                  h-[80vh]
                  bg-white
                "
              />
            )
          }


          {/* ARCHIVE */}
          {
            project.fileType ===
            "archive" && (

              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-8
                  text-center
                  p-10
                "
              >

                <div className="text-8xl">
                  🗂️
                </div>

                <a
                  href={fileUrl}
                  download
                  className="
                    bg-purple-600
                    hover:bg-purple-700
                    px-6
                    py-4
                    rounded-2xl
                    flex
                    items-center
                    gap-3
                  "
                >

                  <FaDownload />

                  Download Archive

                </a>

              </div>
            )
          }

        </div>


        {/* RIGHT INFO */}
        <div
          className="
            p-12
            flex
            flex-col
            justify-between
          "
        >

          <div>

            <p
              className="
                text-purple-400
                mb-6
              "
            >

              @
              {project.user?.username}

            </p>


            <h2
              className="
                text-6xl
                font-bold
                leading-tight
              "
            >

              {project.title}

            </h2>


            <p
              className="
                mt-8
                text-gray-400
                text-xl
                leading-relaxed
              "
            >

              {project.description}

            </p>


            {
              project.tags && (

                <div
                  className="
                    flex
                    flex-wrap
                    gap-3
                    mt-8
                  "
                >

                  {
                    project.tags
                      .split(",")
                      .map((tag, index) => (

                        <span
                          key={index}
                          className="
                            px-4
                            py-2
                            rounded-full
                            bg-black
                            border
                            border-gray-700
                            text-sm
                          "
                        >

                          #{tag.trim()}

                        </span>
                      ))
                  }

                </div>
              )
            }

          </div>


          {/* ACTIONS */}
          <div
            className="
              flex
              gap-4
              mt-10
            "
          >

            {/* SHARE */}
            <button
              onClick={handleShare}
              className="
                flex-1
                bg-purple-600
                hover:bg-purple-700
                transition
                py-4
                rounded-2xl
                flex
                items-center
                justify-center
                gap-3
              "
            >

              <FaShareAlt />

              Share

            </button>


            {/* DELETE */}
            {
              isOwner && (

                <button
                  onClick={handleDelete}
                  className="
                    flex-1
                    bg-red-600
                    hover:bg-red-700
                    transition
                    py-4
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    gap-3
                  "
                >

                  <FaTrash />

                  Delete

                </button>
              )
            }

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProjectModal;