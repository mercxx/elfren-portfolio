import { skills } from "../data/skills"

function Skills() {
  return (
    <section
      id="skills"
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
            04 — Stack
          </p>


          {/* ========================================= */}
          {/* DESCRIPTION */}
          {/* ========================================= */}

          <p
            className="
              mt-5
              max-w-[620px]
              text-sm
              leading-7
              text-gray-500
              dark:text-gray-400
            "
          >
            A collection of technologies, platforms, and tools
            I've learned through academic projects, personal
            development, automation work, and hands-on experience.
          </p>

        </div>


        {/* ========================================= */}
        {/* SKILLS */}
        {/* ========================================= */}

        <div
          className="
            border-t
            border-black/10
            pt-7
            dark:border-white/10
          "
        >

          {skills.map((skillGroup, index) => (
            <div
              key={skillGroup.category}
              className={`
                ${index !== 0 ? "mt-8" : ""}
              `}
            >

              {/* ========================================= */}
              {/* CATEGORY */}
              {/* ========================================= */}

              <p
                className="
                  mb-4
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-gray-400
                  dark:text-gray-600
                "
              >
                {skillGroup.category}
              </p>


              {/* ========================================= */}
              {/* SKILL TAGS */}
              {/* ========================================= */}

              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                "
              >

                {skillGroup.items.map((skill) => (
                  <span
                    key={skill}
                    className="
                      inline-flex
                      items-center
                      rounded-md
                      border
                      border-black/10
                      bg-white
                      px-3
                      py-2
                      text-sm
                      text-gray-600
                      transition-all
                      duration-200
                      hover:border-black/20
                      hover:text-gray-900
                      dark:border-white/10
                      dark:bg-white/[0.02]
                      dark:text-gray-400
                      dark:hover:border-white/20
                      dark:hover:text-white
                    "
                  >
                    {skill}
                  </span>
                ))}

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default Skills