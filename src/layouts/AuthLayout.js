function AuthLayout({ children }) {

  return (

    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* LEFT SIDE */}
      <div
        className="
          hidden lg:flex
          w-1/2
          items-center
          justify-center
          p-20
        "
      >

        <div>

          <h1
            className="
              text-7xl
              font-bold
              leading-tight
            "
          >

            UXverse

          </h1>

          <p
            className="
              mt-8
              text-gray-400
              text-xl
              max-w-xl
              leading-relaxed
            "
          >

            Showcase your creativity,
            discover world-class designers,
            and build your creative identity.

          </p>

        </div>

      </div>


      {/* RIGHT SIDE */}
      <div
        className="
          w-full lg:w-1/2
          flex
          items-center
          justify-center
          p-6
        "
      >

        {children}

      </div>

    </div>
  );
}

export default AuthLayout;