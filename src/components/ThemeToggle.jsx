import { useEffect, useState } from "react"

function ThemeToggle() {

  /* ========================================= */
  /* SYSTEM THEME */
  /* ========================================= */

  const getSystemTheme = () => {

    return window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light"

  }


  /* ========================================= */
  /* THEME */
  /* ========================================= */

  const [theme, setTheme] = useState(() => {

    const savedTheme =
      localStorage.getItem("theme")

    return savedTheme || "system"

  })


  /* ========================================= */
  /* SOUND */
  /* ========================================= */

  const [soundEnabled, setSoundEnabled] = useState(() => {

    return localStorage.getItem("sound") !== "off"

  })


  /* ========================================= */
  /* GET EFFECTIVE THEME */
  /* ========================================= */

  const getEffectiveTheme = (selectedTheme) => {

    if (selectedTheme === "system") {
      return getSystemTheme()
    }

    return selectedTheme

  }


  /* ========================================= */
  /* APPLY THEME */
  /* ========================================= */

  const applyTheme = (selectedTheme) => {

    const root =
      document.documentElement

    const effectiveTheme =
      getEffectiveTheme(selectedTheme)


    if (effectiveTheme === "dark") {

      root.classList.add("dark")

    } else {

      root.classList.remove("dark")

    }

  }


  /* ========================================= */
  /* INITIAL THEME */
  /* ========================================= */

  useEffect(() => {

    applyTheme(theme)

  }, [theme])


  /* ========================================= */
  /* SYSTEM THEME LISTENER */
  /* ========================================= */

  useEffect(() => {

    const mediaQuery =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      )


    const handleSystemThemeChange = () => {

      if (theme === "system") {

        applyTheme("system")

      }

    }


    mediaQuery.addEventListener(
      "change",
      handleSystemThemeChange
    )


    return () => {

      mediaQuery.removeEventListener(
        "change",
        handleSystemThemeChange
      )

    }

  }, [theme])


  /* ========================================= */
  /* TOGGLE SOUND */
  /* ========================================= */

  const toggleSound = () => {

    const newState =
      !soundEnabled


    setSoundEnabled(newState)


    localStorage.setItem(
      "sound",
      newState
        ? "on"
        : "off"
    )

  }


  /* ========================================= */
  /* CHANGE THEME */
  /* ========================================= */

  const changeTheme = (newTheme) => {

    if (newTheme === theme) {
      return
    }


    /* ========================================= */
    /* REDUCED MOTION */
    /* ========================================= */

    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches


    if (reducedMotion) {

      setTheme(newTheme)

      localStorage.setItem(
        "theme",
        newTheme
      )

      applyTheme(newTheme)

      return

    }


    /* ========================================= */
    /* VIEW TRANSITION SUPPORT */
    /* ========================================= */

    const root =
      document.documentElement


    const button =
      document.querySelector(
        `[data-theme-option="${newTheme}"]`
      )


    let x =
      window.innerWidth / 2

    let y =
      window.innerHeight / 2


    if (button) {

      const rect =
        button.getBoundingClientRect()


      x =
        rect.left +
        rect.width / 2


      y =
        rect.top +
        rect.height / 2

    }


    /* ========================================= */
    /* CALCULATE CIRCLE SIZE */
    /* ========================================= */

    const radius =
      Math.hypot(
        Math.max(
          x,
          window.innerWidth - x
        ),
        Math.max(
          y,
          window.innerHeight - y
        )
      )


    root.style.setProperty(
      "--theme-x",
      `${x}px`
    )


    root.style.setProperty(
      "--theme-y",
      `${y}px`
    )


    root.style.setProperty(
      "--theme-radius",
      `${radius}px`
    )


    root.setAttribute(
      "data-theme-transition",
      newTheme === "system"
        ? getSystemTheme()
        : newTheme
    )


    /* ========================================= */
    /* THEME CHANGE FUNCTION */
    /* ========================================= */

    const updateTheme = () => {

      setTheme(newTheme)

      localStorage.setItem(
        "theme",
        newTheme
      )

      applyTheme(newTheme)

    }


    /* ========================================= */
    /* NATIVE VIEW TRANSITION */
    /* ========================================= */

    if (
      typeof document.startViewTransition ===
      "function"
    ) {

      document.startViewTransition(
        updateTheme
      )

      return

    }


    /* ========================================= */
    /* FALLBACK */
    /* ========================================= */

    updateTheme()


    window.setTimeout(() => {

      root.removeAttribute(
        "data-theme-transition"
      )

    }, 560)

  }


  return (

    <div
      className="
        flex
        items-center
        gap-2
      "
    >

      {/* ========================================= */}
      {/* SPEAKER BUTTON */}
      {/* ========================================= */}

      <button
        type="button"
        data-interactive
        data-sound-toggle
        aria-label={
          soundEnabled
            ? "Turn sounds off"
            : "Turn sounds on"
        }
        title={
          soundEnabled
            ? "Turn sounds off"
            : "Turn sounds on"
        }
        onClick={toggleSound}
        className="
          flex
          h-10
          w-10
          cursor-pointer
          items-center
          justify-center
          rounded-full
          border
          border-black/10
          bg-white/70
          text-gray-600
          shadow-sm
          backdrop-blur-md
          transition-all
          duration-200
          hover:text-gray-900
          dark:border-white/10
          dark:bg-white/[0.04]
          dark:text-gray-400
          dark:shadow-none
          dark:hover:text-white
        "
      >

        {soundEnabled ? (

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >

            <polygon
              points="
                11 5
                6 9
                2 9
                2 15
                6 15
                11 19
                11 5
              "
            />

            <path d="M15.5 8.5a5 5 0 0 1 0 7" />

            <path d="M18.5 5.5a9 9 0 0 1 0 13" />

          </svg>

        ) : (

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >

            <polygon
              points="
                11 5
                6 9
                2 9
                2 15
                6 15
                11 19
                11 5
              "
            />

            <line
              x1="23"
              y1="9"
              x2="17"
              y2="15"
            />

            <line
              x1="17"
              y1="9"
              x2="23"
              y2="15"
            />

          </svg>

        )}

      </button>


      {/* ========================================= */}
      {/* THEME CONTROL */}
      {/* ========================================= */}

      <div
        className="
          flex
          h-10
          items-center
          rounded-full
          border
          border-black/10
          bg-white/70
          p-1
          shadow-sm
          backdrop-blur-md
          dark:border-white/10
          dark:bg-white/[0.04]
          dark:shadow-none
        "
      >

        {/* ========================================= */}
        {/* SYSTEM / MONITOR */}
        {/* ========================================= */}

        <button
          type="button"
          data-theme-option="system"
          data-interactive
          aria-label="Use system theme"
          title="Use system theme"
          onClick={() =>
            changeTheme("system")
          }
          className={`
            flex
            h-8
            w-8
            cursor-pointer
            items-center
            justify-center
            rounded-full
            transition-all
            duration-200

            ${
              theme === "system"
                ? `
                  bg-gray-100
                  text-gray-900
                  dark:bg-white/10
                  dark:text-white
                `
                : `
                  text-gray-400
                  hover:text-gray-700
                  dark:text-gray-500
                  dark:hover:text-gray-300
                `
            }
          `}
        >

          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >

            <rect
              x="3"
              y="4"
              width="18"
              height="13"
              rx="2"
            />

            <path d="M8 21h8" />

            <path d="M12 17v4" />

          </svg>

        </button>


        {/* ========================================= */}
        {/* SUN */}
        {/* ========================================= */}

        <button
          type="button"
          data-theme-option="light"
          data-interactive
          aria-label="Light mode"
          title="Light mode"
          onClick={() =>
            changeTheme("light")
          }
          className={`
            flex
            h-8
            w-8
            cursor-pointer
            items-center
            justify-center
            rounded-full
            transition-all
            duration-200

            ${
              theme === "light"
                ? `
                  bg-gray-100
                  text-gray-900
                  dark:bg-white/10
                  dark:text-white
                `
                : `
                  text-gray-400
                  hover:text-gray-700
                  dark:text-gray-500
                  dark:hover:text-gray-300
                `
            }
          `}
        >

          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >

            <circle
              cx="12"
              cy="12"
              r="4"
            />

            <path d="M12 2v2" />
            <path d="M12 20v2" />

            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />

            <path d="M2 12h2" />
            <path d="M20 12h2" />

            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />

          </svg>

        </button>


        {/* ========================================= */}
        {/* MOON */}
        {/* ========================================= */}

        <button
          type="button"
          data-theme-option="dark"
          data-interactive
          aria-label="Dark mode"
          title="Dark mode"
          onClick={() =>
            changeTheme("dark")
          }
          className={`
            flex
            h-8
            w-8
            cursor-pointer
            items-center
            justify-center
            rounded-full
            transition-all
            duration-200

            ${
              theme === "dark"
                ? `
                  bg-gray-100
                  text-gray-900
                  dark:bg-white/10
                  dark:text-white
                `
                : `
                  text-gray-400
                  hover:text-gray-700
                  dark:text-gray-500
                  dark:hover:text-gray-300
                `
            }
          `}
        >

          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >

            <path
              d="
                M21 12.8
                A8.5 8.5 0 1 1
                11.2 3
                A6.7 6.7 0 0 0
                21 12.8Z
              "
            />

          </svg>

        </button>

      </div>

    </div>

  )

}

export default ThemeToggle