function About() {
  return (
    <div
      className="
        border-t
        border-black/10
        py-20
        dark:border-white/10
        lg:py-24
      "
    >

      {/* SECTION HEADER */}

      <div className="mb-12">

        <p
          className="
            display-label
            text-gray-400
            dark:text-gray-500
          "
        >
          01 — About
        </p>

      </div>


      {/* ABOUT CONTENT */}

      <div
        className="
          grid
          gap-12
          lg:grid-cols-[1.35fr_0.65fr]
          lg:gap-14
        "
      >

        {/* INTRODUCTION */}

        <div>

          <h2
            className="
              max-w-[520px]
              text-2xl
              font-medium
              leading-[1.3]
              tracking-tight
              text-gray-900
              dark:text-white
              sm:text-3xl
            "
          >
            Building practical digital solutions
            with AI and automation.
          </h2>


          <div
            className="
              mt-8
              max-w-[500px]
              space-y-5
            "
          >

            <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
              I'm a Computer Engineering graduate focused on
              artificial intelligence, workflow automation,
              and practical software solutions.
            </p>

            <p className="text-sm leading-6 text-gray-500 dark:text-gray-500">
              I enjoy connecting different technologies to
              automate repetitive processes, improve workflows,
              and turn ideas into useful digital systems.
            </p>

            <p className="text-sm leading-6 text-gray-500 dark:text-gray-500">
              My experience includes AI tools, automation
              platforms, APIs, web technologies, networking,
              and IoT systems. I'm continuously building
              projects to strengthen these skills.
            </p>

          </div>

        </div>


        {/* QUICK INFORMATION */}

        <div>

          <div className="border-t border-black/10 py-5 dark:border-white/10">

            <p className="display-label text-gray-400 dark:text-gray-500">
              Education
            </p>

            <p className="mt-3 text-sm font-medium text-gray-900 dark:text-white">
              Computer Engineering
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Batangas State University
            </p>

          </div>


          <div className="border-t border-black/10 py-5 dark:border-white/10">

            <p className="display-label text-gray-400 dark:text-gray-500">
              Focus
            </p>

            <p className="mt-3 text-sm font-medium text-gray-900 dark:text-white">
              AI & Automation
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Workflow solutions and intelligent systems
            </p>

          </div>


          <div className="border-t border-black/10 py-5 dark:border-white/10">

            <p className="display-label text-gray-400 dark:text-gray-500">
              Interests
            </p>

            <p className="mt-3 text-xs leading-5 text-gray-500">
              AI · Workflow Automation · APIs ·
              System Integration · Software · IoT
            </p>

          </div>


          <div className="border-y border-black/10 py-5 dark:border-white/10">

            <p className="display-label text-gray-400 dark:text-gray-500">
              Currently
            </p>

            <p className="mt-3 text-sm font-medium text-gray-900 dark:text-white">
              Building & Learning
            </p>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Exploring AI automation and practical
              workflow solutions.
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}

export default About