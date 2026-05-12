function SuccessModal({ message }) {

  return (

    <div
      className="
        fixed
        inset-0
        bg-black/60
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-50
      "
    >

      <div
        className="
          bg-[#111827]
          border
          border-purple-500/30
          rounded-3xl
          px-12
          py-10
          shadow-2xl
          text-center
          animate-pulse
        "
      >

        <div
          className="
            w-20
            h-20
            rounded-full
            bg-purple-600
            flex
            items-center
            justify-center
            mx-auto
            text-4xl
          "
        >

          ✓

        </div>

        <h2
          className="
            text-3xl
            font-bold
            mt-6
          "
        >

          Success

        </h2>

        <p
          className="
            text-gray-400
            mt-3
            text-lg
          "
        >

          {message}

        </p>

      </div>

    </div>
  );
}

export default SuccessModal;