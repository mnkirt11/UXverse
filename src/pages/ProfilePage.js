import {
  useEffect,
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import API from "../api/axios";
import ProjectModal from "../components/ProjectModal";


function ProfilePage() {

  const { username } = useParams();

  const [user, setUser] = useState(null);
  const [selectedProject, setSelectedProject] =
  useState(null);


  useEffect(() => {

    fetchProfile();

  }, [username]);


  const fetchProfile = async () => {

    try {

      const response = await API.get(
        `/users/${username}`
      );

      setUser(response.data);

    } catch (error) {

      console.log(error);
    }
  };


  if (!user) {

    return (


      
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          text-2xl
        "
      >

        Loading...

      </div>
    );
  }


  return (

    <>
  <ProjectModal
    project={selectedProject}
    onClose={() =>
      setSelectedProject(null)
    }
  />

    <div className="min-h-screen p-8">

      {/* PROFILE HEADER */}
      <div
        className="
          bg-[#111827]
          border
          border-gray-800
          rounded-3xl
          p-10
          mb-10
        "
      >

        <h1
          className="
            text-5xl
            font-bold
          "
        >

          {user.username}

        </h1>

        <p
          className="
            text-gray-400
            mt-4
            text-lg
          "
        >

          {user.email}

        </p>

      </div>


      {/* POSTS */}
      <div>

        <h2
          className="
            text-4xl
            font-bold
            mb-8
          "
        >

          Creator Works

        </h2>


        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >

          {
            user.posts.map((post) => (

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
                  transition
                "
              >

                <img
                  src={
                    `http://localhost:5000${post.imageUrl}`
                  }
                  alt={post.title}
                  className="
                    w-full
                    h-[280px]
                    object-cover
                  "
                />

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

    </>
  );
}

export default ProfilePage;