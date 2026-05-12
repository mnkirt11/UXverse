// import {
//   useEffect,
//   useState
// } from "react";

// import { Link } from "react-router-dom";

// import API from "../api/axios";
// import ProjectModal from "../components/ProjectModal";


// function ExplorePage() {

//   const [posts, setPosts] = useState([]);

//   const [selectedProject, setSelectedProject] =
//   useState(null);


//   useEffect(() => {

//     fetchPosts();

//   }, []);


//   const fetchPosts = async () => {

//     try {

//       const response = await API.get(
//         "/posts/explore"
//       );

//       setPosts(response.data);

//     } catch (error) {

//       console.log(error);
//     }
//   };


//   return (

//     <>
//   <ProjectModal
//     project={selectedProject}
//     onClose={() =>
//       setSelectedProject(null)
//     }
//   />

//     <div className="min-h-screen p-8">

//       <div className="mb-12">

//         <h1
//           className="
//             text-6xl
//             font-bold
//           "
//         >

//           Explore

//         </h1>

//         <p
//           className="
//             mt-4
//             text-gray-400
//             text-xl
//           "
//         >

//           Discover inspiring creators and projects.

//         </p>

//       </div>


//       <div
//         className="
//           grid
//           grid-cols-1
//           md:grid-cols-2
//           lg:grid-cols-3
//           gap-10
//         "
//       >

//         {
//           posts.map((post) => (

//             <div
//               key={post.id}
//               onClick={() =>
//     setSelectedProject(post)
//   }
//               className="
//                 bg-[#111827]
//                 border
//                 border-gray-800
//                 rounded-3xl
//                 overflow-hidden
//                 hover:border-purple-500
//                 hover:-translate-y-2
//                 hover:shadow-purple-500/20
//                 hover:shadow-2xl
//                 transition-all
//                 duration-300
//               "
//             >

//               <img
//                 src={
//                   `http://localhost:5000${post.imageUrl}`
//                 }
//                 alt={post.title}
//                 className="
//                   w-full
//                   h-[320px]
//                   object-cover
//                 "
//               />


//               <div className="p-6">

//                 <Link
//   to={`/profile/${post.user.username}`}
//   onClick={(e) => e.stopPropagation()}
//   className="
//     text-purple-400
//     hover:text-purple-300
//     text-sm
//     relative
//     z-20
//   "
// >

//   @{post.user.username}

// </Link>


//                 <h2
//                   className="
//                     text-2xl
//                     font-bold
//                     mt-3
//                   "
//                 >

//                   {post.title}

//                 </h2>

//                 <p
//                   className="
//                     mt-3
//                     text-gray-400
//                     leading-relaxed
//                   "
//                 >

//                   {post.description}

//                 </p>

//               </div>

//             </div>
//           ))
//         }

//       </div>

//     </div>

//     </>
//   );
// }

// export default ExplorePage;

import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import {
  FaSearch
} from "react-icons/fa";

import API from "../api/axios";

import ProjectModal
from "../components/ProjectModal";


function ExplorePage() {

  const [posts, setPosts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [selectedProject,
    setSelectedProject] =
    useState(null);


  useEffect(() => {

    fetchPosts();

  }, []);


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

      const publicPosts =
        response.data.filter(
          (post) =>
            post.visibility ===
            "public"
        );

      setPosts(publicPosts);

    } catch (error) {

      console.log(error);
    }
  };


  const filteredPosts =
    posts.filter((post) => {

      const query =
        search.toLowerCase();

      return (

        post.title
          ?.toLowerCase()
          .includes(query)

        ||

        post.tags
          ?.toLowerCase()
          .includes(query)

        ||

        post.category
          ?.toLowerCase()
          .includes(query)

        ||

        post.user?.username
          ?.toLowerCase()
          .includes(query)
      );
    });


  return (

    <>

      <ProjectModal
        project={selectedProject}
        onClose={() =>
          setSelectedProject(null)
        }
      />


      <div className="min-h-screen p-8">

        {/* HEADER */}
        <div className="mb-12">

          <h1
            className="
              text-6xl
              font-bold
            "
          >

            Explore

          </h1>

          <p
            className="
              mt-4
              text-gray-400
              text-xl
            "
          >

            Discover inspiring creators and projects.

          </p>

        </div>


        {/* SEARCH */}
        <div
          className="
            flex
            items-center
            bg-[#111827]
            border
            border-gray-700
            rounded-2xl
            px-5
            py-4
            max-w-xl
            mb-12
          "
        >

          <FaSearch
            className="
              text-gray-500
            "
          />

          <input
            type="text"
            placeholder="Search creators, tags, projects..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              bg-transparent
              outline-none
              ml-4
              w-full
              text-white
            "
          />

        </div>


        {/* POSTS */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-10
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
                  cursor-pointer
                "
              >

                <img
                  src={
                    `http://localhost:5000${post.imageUrl}`
                  }
                  alt={post.title}
                  className="
                    w-full
                    h-[320px]
                    object-cover
                  "
                />


                <div className="p-6">

                  <Link
                    to={`/profile/${post.user.username}`}
                    onClick={(e) =>
                      e.stopPropagation()
                    }
                    className="
                      text-purple-400
                      hover:text-purple-300
                      text-sm
                    "
                  >

                    @{post.user.username}

                  </Link>


                  <h2
                    className="
                      text-2xl
                      font-bold
                      mt-3
                    "
                  >

                    {post.title}

                  </h2>

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

    </>
  );
}

export default ExplorePage;