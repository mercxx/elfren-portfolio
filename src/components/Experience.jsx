function Experience() {
  return (
    <section
      id="experience"
      className="
        border-t
        border-black/10
        py-20
        dark:border-white/10
        lg:py-24
      "
    >
      <div className="mx-auto w-full max-w-[820px]">

        {/* ========================================= */}
        {/* SECTION LABEL */}
        {/* ========================================= */}

        <div className="mb-12">

          <p
            className="
              display-label
              text-gray-400
              dark:text-gray-500
            "
          >
            03 — Experience
          </p>

        </div>


        {/* ========================================= */}
        {/* EXPERIENCE LIST */}
        {/* ========================================= */}

        <div>

          {/* ========================================= */}
          {/* OJT */}
          {/* ========================================= */}

          <div
            className="
              grid
              gap-5
              border-t
              border-black/10
              py-7
              dark:border-white/10
              sm:grid-cols-[120px_1fr]
            "
          >

            {/* YEAR */}

            <div>

              <p
                className="
                  text-xs
                  tabular-nums
                  text-gray-400
                  dark:text-gray-600
                "
              >
                2026
              </p>

            </div>


            {/* CONTENT */}

            <div>

              <h3
                className="
                  text-base
                  font-medium
                  tracking-tight
                  text-gray-900
                  dark:text-white
                "
              >
                OJT / Internship
              </h3>


              <p
                className="
                  mt-1.5
                  text-sm
                  text-gray-500
                  dark:text-gray-500
                "
              >
                Nutech Hardware & Software Solutions
              </p>


              <p
                className="
                  mt-4
                  max-w-xl
                  text-sm
                  leading-7
                  text-gray-500
                  dark:text-gray-500
                "
              >
                Gained hands-on experience in a professional
                environment while applying technical knowledge
                from my Computer Engineering studies to
                real-world systems and tasks.
              </p>

            </div>

          </div>


          {/* ========================================= */}
          {/* ACADEMIC PROJECTS */}
          {/* ========================================= */}

          <div
            className="
              grid
              gap-5
              border-t
              border-black/10
              py-7
              dark:border-white/10
              sm:grid-cols-[120px_1fr]
            "
          >

            {/* YEAR */}

            <div>

              <p
                className="
                  text-xs
                  tabular-nums
                  text-gray-400
                  dark:text-gray-600
                "
              >
                2022 — 2026
              </p>

            </div>


            {/* CONTENT */}

            <div>

              <h3
                className="
                  text-base
                  font-medium
                  tracking-tight
                  text-gray-900
                  dark:text-white
                "
              >
                Academic Projects
              </h3>


              <p
                className="
                  mt-1.5
                  text-sm
                  text-gray-500
                  dark:text-gray-500
                "
              >
                Batangas State University
              </p>


              <p
                className="
                  mt-4
                  max-w-xl
                  text-sm
                  leading-7
                  text-gray-500
                  dark:text-gray-500
                "
              >
                Developed and collaborated on projects involving
                artificial intelligence, automation, software
                development, networking, IoT, embedded systems,
                and system integration.
              </p>

            </div>

          </div>


          {/* ========================================= */}
          {/* SELF-DIRECTED LEARNING */}
          {/* ========================================= */}

          <div
            className="
              grid
              gap-5
              border-y
              border-black/10
              py-7
              dark:border-white/10
              sm:grid-cols-[120px_1fr]
            "
          >

            {/* YEAR */}

            <div>

              <p
                className="
                  text-xs
                  text-gray-400
                  dark:text-gray-600
                "
              >
                Ongoing
              </p>

            </div>


            {/* CONTENT */}

            <div>

              <h3
                className="
                  text-base
                  font-medium
                  tracking-tight
                  text-gray-900
                  dark:text-white
                "
              >
                Personal Learning & Development
              </h3>


              <p
                className="
                  mt-1.5
                  text-sm
                  text-gray-500
                  dark:text-gray-500
                "
              >
                Self-Directed Learning
              </p>


              <p
                className="
                  mt-4
                  max-w-xl
                  text-sm
                  leading-7
                  text-gray-500
                  dark:text-gray-500
                "
              >
                Continuously building projects and exploring
                technologies related to AI, workflow automation,
                software development, APIs, and system
                integration.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Experience