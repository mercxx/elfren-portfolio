import { useEffect, useState } from "react"

import darkProfile from "../assets/images/profile-dark.JPG"
import lightProfile from "../assets/images/profile-light.JPG"


// =========================================
// DARK MODE IMAGE ADJUSTMENTS
// =========================================

const darkImagePositionX = 0
const darkImagePositionY = 0
const darkImageScale = 1.13


// =========================================
// LIGHT MODE IMAGE ADJUSTMENTS
// =========================================

const lightImagePositionX = 0
const lightImagePositionY = 0
const lightImageScale = 1.13


function Hero() {

  /*
   * =========================================
   * THEME
   * =========================================
   *
   * Read the saved theme first.
   */

  const [isDark, setIsDark] = useState(() => {

    const savedTheme =
      localStorage.getItem("theme")


    if (savedTheme === "dark") {
      return true
    }


    if (savedTheme === "light") {
      return false
    }


    return document.documentElement.classList.contains("dark")

  })


  /*
   * =========================================
   * CONTACT POPUP
   * =========================================
   */

  const [showContact, setShowContact] =
    useState(false)


  /*
   * =========================================
   * WATCH THEME CHANGES
   * =========================================
   */

  useEffect(() => {

    const root =
      document.documentElement


    const updateTheme = () => {

      const savedTheme =
        localStorage.getItem("theme")


      if (savedTheme === "dark") {

        setIsDark(true)

        return

      }


      if (savedTheme === "light") {

        setIsDark(false)

        return

      }


      setIsDark(
        root.classList.contains("dark")
      )

    }


    updateTheme()


    const observer =
      new MutationObserver(updateTheme)


    observer.observe(
      root,
      {
        attributes: true,
        attributeFilter: ["class"],
      }
    )


    return () => {

      observer.disconnect()

    }

  }, [])


  /*
   * =========================================
   * CLOSE POPUP WITH ESCAPE
   * =========================================
   */

  useEffect(() => {

    if (!showContact) {
      return
    }


    const handleKeyDown = (event) => {

      if (event.key === "Escape") {

        setShowContact(false)

      }

    }


    document.addEventListener(
      "keydown",
      handleKeyDown
    )


    return () => {

      document.removeEventListener(
        "keydown",
        handleKeyDown
      )

    }

  }, [showContact])


  /*
   * =========================================
   * PREVENT BACKGROUND SCROLL
   * =========================================
   */

  useEffect(() => {

    if (!showContact) {
      return
    }


    const previousOverflow =
      document.body.style.overflow


    document.body.style.overflow = "hidden"


    return () => {

      document.body.style.overflow =
        previousOverflow

    }

  }, [showContact])


  /*
   * =========================================
   * IMAGE SETTINGS
   * =========================================
   */

  const image =
    isDark
      ? darkProfile
      : lightProfile


  const imagePositionX =
    isDark
      ? darkImagePositionX
      : lightImagePositionX


  const imagePositionY =
    isDark
      ? darkImagePositionY
      : lightImagePositionY


  const imageScale =
    isDark
      ? darkImageScale
      : lightImageScale


  return (
    <div
      className="
        flex
        min-h-[620px]
        items-center
        py-20
        lg:min-h-[680px]
        lg:py-24
      "
    >

      {/* ========================================= */}
      {/* HERO GRID */}
      {/* ========================================= */}

      <div
        className="
          grid
          w-full
          grid-cols-1
          items-center
          gap-10
          lg:grid-cols-[1fr_300px]
          lg:gap-10
        "
      >

        {/* ========================================= */}
        {/* RIGHT — PROFILE IMAGE */}
        {/* ========================================= */}

        <div
          className="
            relative
            order-1
            flex
            h-[320px]
            w-full
            items-center
            justify-center
            lg:order-2
            lg:h-[380px]
            lg:w-[300px]
          "
        >

          {/* LIGHT MODE GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              h-[300px]
              w-[300px]
              rounded-full
              bg-cyan-400/10
              blur-3xl
              dark:hidden
              lg:h-[380px]
              lg:w-[340px]
            "
          />


          {/* DARK MODE GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              hidden
              h-[300px]
              w-[300px]
              rounded-full
              bg-cyan-400/5
              blur-3xl
              dark:block
              lg:h-[380px]
              lg:w-[340px]
            "
          />


          {/* ========================================= */}
          {/* IMAGE FRAME */}
          {/* ========================================= */}

          <div
            className="
              relative
              z-10
              h-[300px]
              w-[260px]
              overflow-hidden
              rounded-[20px]
              border
              border-black/10
              bg-gray-100
              p-1.5
              shadow-sm
              dark:border-white/10
              dark:bg-white/[0.02]
              dark:shadow-none
              sm:h-[340px]
              sm:w-[280px]
              lg:h-[380px]
              lg:w-[300px]
              lg:rounded-[22px]
            "
          >

            {/* ========================================= */}
            {/* SINGLE THEME-AWARE IMAGE */}
            {/* ========================================= */}

            <img
              src={image}
              alt="Elfren Ruzmer Cruz"
              className="
                h-full
                w-full
                rounded-[15px]
                object-cover
                lg:rounded-[17px]
              "
              style={{
                objectPosition: `
                  ${50 + imagePositionX}%
                  ${50 + imagePositionY}%
                `,
                transform: `scale(${imageScale})`,
              }}
            />

          </div>

        </div>


        {/* ========================================= */}
        {/* LEFT — HERO TEXT */}
        {/* ========================================= */}

        <div
          className="
            order-2
            flex
            h-[380px]
            max-w-[450px]
            flex-col
            justify-between
            lg:order-1
          "
        >

          {/* ========================================= */}
          {/* TOP CONTENT */}
          {/* ========================================= */}

          <div>

            {/* NAME */}

            <h1
              className="
                text-3xl
                font-medium
                leading-[1.05]
                tracking-[-0.045em]
                text-gray-900
                dark:text-white
                sm:text-4xl
                lg:text-[42px]
              "
            >
              Elfren Ruzmer Cruz
              <span
                className="
                  text-cyan-400
                "
              >
                .
              </span>
            </h1>


            {/* ========================================= */}
            {/* ROLE */}
            {/* ========================================= */}

            <div
              className="
                mt-7
                flex
                items-center
                gap-4
              "
            >

              {/* SMALL CYAN LINE */}

              <span
                className="
                  h-[3px]
                  w-8
                  rounded-full
                  bg-cyan-400
                "
              />


              {/* SMALL DOT */}

              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-cyan-400
                "
              />


              {/* ROLE */}

              <p
                className="
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-[0.16em]
                  text-gray-500
                  dark:text-gray-400
                "
              >
                Aspiring AI Automation Engineer
              </p>

            </div>


            {/* ========================================= */}
            {/* TOP DIVIDER */}
            {/* ========================================= */}

            <div
              className="
                mt-8
                h-px
                w-full
                bg-black/10
                dark:bg-white/10
              "
            />


            {/* ========================================= */}
            {/* DESCRIPTION */}
            {/* ========================================= */}

            <p
              className="
                mt-8
                max-w-[430px]
                text-sm
                leading-7
                text-gray-500
                dark:text-gray-400
              "
            >
              Designing intelligent automation solutions
              that streamline workflows, integrate
              technologies, and transform ideas into
              practical digital systems.
            </p>

          </div>


          {/* ========================================= */}
          {/* BOTTOM CONTENT */}
          {/* ========================================= */}

          <div>

            {/* ========================================= */}
            {/* BOTTOM DIVIDER */}
            {/* ========================================= */}

            <div
              className="
                mb-6
                h-px
                w-full
                bg-black/10
                dark:bg-white/10
              "
            />


            {/* ========================================= */}
            {/* HERO LINKS */}
            {/* ========================================= */}

            <div
              className="
                flex
                items-center
                gap-8
              "
            >

              {/* ========================================= */}
              {/* LINKEDIN */}
              {/* ========================================= */}

              <a
                href="https://www.linkedin.com/in/elfren-ruzmer-cruz-9156b8381/"
                target="_blank"
                rel="noopener noreferrer"
                data-interactive
                className="
                  group
                  relative
                  cursor-pointer
                  select-none
                  pb-2
                  text-sm
                  font-medium
                  text-gray-900
                  transition
                  duration-300
                  hover:text-gray-500
                  dark:text-white
                  dark:hover:text-gray-400
                "
              >

                View LinkedIn

                <span
                  className="
                    ml-1.5
                    text-cyan-400
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  ↗
                </span>


                {/* LINK UNDERLINE */}

                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-px
                    w-full
                    origin-left
                    scale-x-100
                    bg-cyan-400
                    transition-transform
                    duration-300
                    group-hover:scale-x-0
                  "
                />

              </a>


              {/* ========================================= */}
              {/* GET IN TOUCH */}
              {/* ========================================= */}

              <button
                type="button"
                data-interactive
                onClick={() => setShowContact(true)}
                className="
                  group
                  relative
                  cursor-pointer
                  select-none
                  border-0
                  bg-transparent
                  p-0
                  pb-2
                  text-sm
                  font-medium
                  text-gray-500
                  outline-none
                  transition
                  duration-300
                  hover:text-gray-900
                  dark:text-gray-400
                  dark:hover:text-white
                "
              >

                Get in touch

                <span
                  className="
                    ml-1.5
                    text-cyan-400
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  ↗
                </span>


                {/* LINK UNDERLINE */}

                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-px
                    w-full
                    origin-left
                    scale-x-0
                    bg-cyan-400
                    transition-transform
                    duration-300
                    group-hover:scale-x-100
                  "
                />

              </button>

            </div>

          </div>

        </div>

      </div>


      {/* ========================================= */}
      {/* CONTACT POPUP */}
      {/* ========================================= */}

      {showContact && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            p-6
          "
        >

          {/* ========================================= */}
          {/* BLURRED BACKDROP */}
          {/* ========================================= */}

          <button
            type="button"
            aria-label="Close contact window"
            onClick={() => setShowContact(false)}
            className="
              absolute
              inset-0
              cursor-default
              border-0
              bg-black/25
              p-0
              backdrop-blur-md
              dark:bg-black/45
            "
          />


          {/* ========================================= */}
          {/* CONTACT CARD */}
          {/* ========================================= */}

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-title"
            className="
              relative
              z-10
              w-full
              max-w-[380px]
              rounded-2xl
              border
              border-black/10
              bg-white
              p-7
              shadow-2xl
              animate-contact-popup
              dark:border-white/10
              dark:bg-[#101010]
            "
          >

            {/* ========================================= */}
            {/* CLOSE BUTTON */}
            {/* ========================================= */}

            <button
              type="button"
              aria-label="Close contact window"
              onClick={() => setShowContact(false)}
              data-interactive
              className="
                absolute
                right-4
                top-4
                flex
                h-8
                w-8
                cursor-pointer
                items-center
                justify-center
                rounded-full
                border-0
                bg-transparent
                text-gray-400
                transition
                duration-200
                hover:bg-gray-100
                hover:text-gray-900
                dark:hover:bg-white/10
                dark:hover:text-white
              "
            >

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>

            </button>


            {/* TITLE */}

            <p
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.22em]
                text-gray-400
                dark:text-gray-500
              "
            >
              Contact
            </p>


            <h2
              id="contact-title"
              className="
                mt-2
                text-xl
                font-medium
                tracking-tight
                text-gray-900
                dark:text-white
              "
            >
              Get in touch
            </h2>


            <p
              className="
                mt-2
                text-sm
                leading-6
                text-gray-500
                dark:text-gray-400
              "
            >
              Feel free to reach out for opportunities,
              collaborations, or interesting projects.
            </p>


            {/* CONTACT INFORMATION */}

            <div
              className="
                mt-6
                space-y-4
                border-t
                border-black/10
                pt-5
                dark:border-white/10
              "
            >

              {/* EMAIL */}

              <div>

                <p
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-gray-400
                    dark:text-gray-500
                  "
                >
                  Email
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  mercadoelfren@gmail.com
                </p>

              </div>


              {/* PHONE */}

              <div>

                <p
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-gray-400
                    dark:text-gray-500
                  "
                >
                  Contact number
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-700
                    dark:text-gray-200
                  "
                >
                  09957769838
                </p>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default Hero