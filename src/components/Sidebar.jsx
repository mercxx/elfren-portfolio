import { useEffect, useState } from "react"

import logo from "../assets/images/logo.png"
import avatar1 from "../assets/images/avatar-1.png"
import avatar2 from "../assets/images/avatar-2.png"
import avatar3 from "../assets/images/avatar-3.png"
import ThemeToggle from "./ThemeToggle"


function Sidebar({
  onlineVisitors = 0,
  visitors = [],
  activeSection = "about",
  onSectionChange,
  onReturnToScroll,
  viewMode = "scroll",
}) {

  /*
   * =========================================
   * MOBILE MENU STATE
   * =========================================
   */

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false)


  /*
   * =========================================
   * NAVIGATION ITEMS
   * =========================================
   *
   * Home is intentionally removed.
   */

  const navigationItems = [
    {
      id: "about",
      label: "About",
    },
    {
      id: "projects",
      label: "Projects",
    },
    {
      id: "experience",
      label: "Experience",
    },
    {
      id: "skills",
      label: "Stack",
    },
    {
      id: "certifications",
      label: "Certifications",
    },
  ]


  /*
   * =========================================
   * ACTIVE NAVIGATION INDEX
   * =========================================
   *
   * Desktop navigation remains unchanged.
   */

  const activeIndex = Math.max(
    navigationItems.findIndex(
      (item) => item.id === activeSection
    ),
    0
  )


  /*
   * Each navigation item has:
   *
   * height = 20px
   * gap    = 20px
   *
   * Therefore each item occupies 40px.
   */

  const arrowPosition =
    activeIndex * 40 + 2


  /*
   * =========================================
   * REALTIME DATE & TIME
   * =========================================
   *
   * Philippine time is used regardless of the
   * computer's local timezone.
   */

  const [currentDateTime, setCurrentDateTime] =
    useState(new Date())


  useEffect(() => {

    const updateDateTime = () => {

      setCurrentDateTime(
        new Date()
      )

    }


    updateDateTime()


    const interval =
      setInterval(
        updateDateTime,
        1000
      )


    return () => {

      clearInterval(interval)

    }

  }, [])


  /*
   * =========================================
   * PHILIPPINE TIME FORMATTING
   * =========================================
   */

  const philippinesTime =
    new Intl.DateTimeFormat(
      "en-PH",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Manila",
      }
    ).format(currentDateTime)


  const philippinesDate =
    new Intl.DateTimeFormat(
      "en-PH",
      {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "Asia/Manila",
      }
    ).format(currentDateTime)


  /*
   * =========================================
   * AVATAR IMAGES
   * =========================================
   */

  const avatarImages = [
    avatar1,
    avatar2,
    avatar3,
  ]


  /*
   * =========================================
   * VISIBLE VISITORS
   * =========================================
   */

  const visibleVisitors =
    visitors.slice(0, 3)


  /*
   * =========================================
   * STABLE AVATAR ASSIGNMENT
   * =========================================
   */

  const getAvatar = (
    visitor,
    index
  ) => {

    if (!visitor?.id) {

      return avatarImages[
        index % avatarImages.length
      ]

    }


    let hash = 0


    for (
      let i = 0;
      i < visitor.id.length;
      i++
    ) {

      hash =
        visitor.id.charCodeAt(i) +
        ((hash << 5) - hash)

    }


    const avatarIndex =
      Math.abs(hash) %
      avatarImages.length


    return avatarImages[avatarIndex]

  }


  /*
   * =========================================
   * REMAINING VISITORS
   * =========================================
   */

  const remainingVisitors =
    Math.max(
      onlineVisitors - 3,
      0
    )


  /*
   * =========================================
   * NAVIGATION CLICK
   * =========================================
   */

  const handleNavigation = (sectionId) => {

    if (typeof onSectionChange === "function") {

      onSectionChange(sectionId)

    }

    /*
     * Close mobile drawer after navigation.
     * Desktop behavior remains unchanged.
     */

    setMobileMenuOpen(false)

  }


  /*
   * =========================================
   * LOGO CLICK
   * =========================================
   *
   * Returns to normal full-page mode.
   */

  const handleLogoClick = (event) => {

    event.preventDefault()


    if (
      typeof onReturnToScroll === "function"
    ) {

      onReturnToScroll()

    }


    setMobileMenuOpen(false)

  }


  /*
   * =========================================
   * MOBILE MENU TOGGLE
   * =========================================
   */

  const toggleMobileMenu = () => {

    setMobileMenuOpen(
      (previous) => !previous
    )

  }


  /*
   * =========================================
   * CLOSE MOBILE MENU
   * =========================================
   */

  const closeMobileMenu = () => {

    setMobileMenuOpen(false)

  }


  /*
   * =========================================
   * ESCAPE KEY
   * =========================================
   */

  useEffect(() => {

    const handleKeyDown = (event) => {

      if (
        event.key === "Escape" &&
        mobileMenuOpen
      ) {

        setMobileMenuOpen(false)

      }

    }


    window.addEventListener(
      "keydown",
      handleKeyDown
    )


    return () => {

      window.removeEventListener(
        "keydown",
        handleKeyDown
      )

    }

  }, [mobileMenuOpen])


  /*
   * =========================================
   * PREVENT MOBILE BACKGROUND SCROLL
   * =========================================
   */

  useEffect(() => {

    if (!mobileMenuOpen) {
      document.body.style.overflow = ""
      return
    }


    document.body.style.overflow = "hidden"


    return () => {

      document.body.style.overflow = ""

    }

  }, [mobileMenuOpen])


  return (
    <>

      {/* ================================================= */}
      {/* MOBILE TOP BAR */}
      {/* ================================================= */}

      <header
        className="
          fixed
          left-0
          top-0
          z-[60]
          flex
          h-[64px]
          w-full
          items-center
          justify-between
          border-b
          border-black/10
          bg-white/90
          px-4
          backdrop-blur-md
          dark:border-white/10
          dark:bg-[#080808]/90
          lg:hidden
        "
      >

        {/* ========================================= */}
        {/* MOBILE LOGO */}
        {/* ========================================= */}

        <a
          href="#"
          data-interactive
          onClick={handleLogoClick}
          className="
            flex
            cursor-pointer
            select-none
            items-center
          "
        >

          <img
            src={logo}
            alt="ERC Logo"
            className="
              h-9
              w-auto
              object-contain
            "
          />

        </a>


        {/* ========================================= */}
        {/* MOBILE MENU BUTTON */}
        {/* ========================================= */}

        <button
          type="button"
          data-interactive
          aria-label={
            mobileMenuOpen
              ? "Close menu"
              : "Open menu"
          }
          aria-expanded={mobileMenuOpen}
          onClick={toggleMobileMenu}
          className="
            flex
            h-10
            w-10
            cursor-pointer
            select-none
            items-center
            justify-center
            border-0
            bg-transparent
            p-0
            text-gray-600
            outline-none
            transition-colors
            duration-300
            hover:text-gray-900
            dark:text-gray-300
            dark:hover:text-white
          "
        >

          {mobileMenuOpen ? (

            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >

              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />

            </svg>

          ) : (

            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >

              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />

            </svg>

          )}

        </button>

      </header>


      {/* ================================================= */}
      {/* MOBILE MENU OVERLAY */}
      {/* ================================================= */}

      <div
        className={`
          fixed
          inset-0
          z-[55]
          bg-black/20
          backdrop-blur-[2px]
          transition-opacity
          duration-300
          lg:hidden

          ${
            mobileMenuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
        onClick={closeMobileMenu}
        aria-hidden={!mobileMenuOpen}
      />


      {/* ================================================= */}
      {/* MOBILE NAVIGATION DRAWER */}
      {/* ================================================= */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-[58]
          flex
          h-screen
          w-full
          max-w-[360px]
          flex-col
          overflow-y-auto
          border-r
          border-black/10
          bg-white
          px-5
          pb-8
          pt-5
          shadow-2xl
          transition-transform
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          dark:border-white/10
          dark:bg-[#080808]

          lg:hidden

          ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* ========================================= */}
        {/* MOBILE DRAWER HEADER */}
        {/* ========================================= */}

        <div
          className="
            flex
            h-10
            shrink-0
            items-center
            justify-between
          "
        >

          <a
            href="#"
            data-interactive
            onClick={handleLogoClick}
            className="
              flex
              cursor-pointer
              select-none
              items-center
            "
          >

            <img
              src={logo}
              alt="ERC Logo"
              className="
                h-9
                w-auto
                object-contain
              "
            />

          </a>


          <button
            type="button"
            data-interactive
            aria-label="Close menu"
            onClick={closeMobileMenu}
            className="
              flex
              h-10
              w-10
              cursor-pointer
              items-center
              justify-center
              border-0
              bg-transparent
              p-0
              text-gray-500
              transition-colors
              duration-300
              hover:text-gray-900
              dark:text-gray-400
              dark:hover:text-white
            "
          >

            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >

              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />

            </svg>

          </button>

        </div>


        {/* ========================================= */}
        {/* MOBILE NAVIGATION */}
        {/* ========================================= */}

        <nav
          className="
            mt-12
            flex
            flex-col
          "
        >

          {navigationItems.map(
            (item, index) => {

              const isActive =
                activeSection === item.id


              return (
                <button
                  key={item.id}
                  type="button"
                  data-interactive
                  onClick={() =>
                    handleNavigation(item.id)
                  }
                  className={`
                    group
                    flex
                    min-h-[48px]
                    cursor-pointer
                    select-none
                    items-center
                    border-0
                    bg-transparent
                    p-0
                    text-left
                    outline-none
                    transition-all
                    duration-300

                    ${
                      index > 0
                        ? "mt-1"
                        : ""
                    }

                    ${
                      isActive
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-500 dark:text-gray-400"
                    }
                  `}
                >

                  <span
                    className={`
                      mr-3
                      w-4
                      text-xs
                      transition-all
                      duration-300

                      ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      }
                    `}
                  >
                    →
                  </span>

                  <span
                    className="
                      text-[15px]
                      font-medium
                      tracking-tight
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  >
                    {item.label}
                  </span>

                </button>
              )

            }
          )}

        </nav>


        {/* ========================================= */}
        {/* MOBILE BOTTOM CONTENT */}
        {/* ========================================= */}

        <div
          className="
            mt-auto
            flex
            flex-col
            gap-7
            pt-12
          "
        >

          {/* ========================================= */}
          {/* LOCATION & TIME */}
          {/* ========================================= */}

          <div
            className="
              border-t
              border-black/10
              pt-5
              dark:border-white/10
            "
          >

            {/* LOCATION */}

            <div
              className="
                flex
                items-center
                gap-2.5
                text-gray-500
                dark:text-gray-400
              "
            >

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="
                  shrink-0
                  text-gray-400
                  dark:text-gray-500
                "
              >

                <path
                  d="
                    M20 10
                    c0 5-8 11-8 11
                    S4 15 4 10
                    a8 8 0 1 1 16 0Z
                  "
                />

                <circle
                  cx="12"
                  cy="10"
                  r="2.5"
                />

              </svg>


              <span
                className="
                  text-xs
                  leading-5
                "
              >
                Lipa City, Philippines
              </span>

            </div>


            {/* TIME */}

            <div
              className="
                mt-2
                flex
                items-center
                gap-2.5
                text-gray-500
                dark:text-gray-400
              "
            >

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="
                  shrink-0
                  text-gray-400
                  dark:text-gray-500
                "
              >

                <circle
                  cx="12"
                  cy="12"
                  r="9"
                />

                <path
                  d="M12 7v5l3 2"
                />

              </svg>


              <span
                className="
                  font-mono
                  text-xs
                  leading-5
                  tracking-tight
                "
              >
                {philippinesTime}
                {" · "}
                PHT
                {" · "}
                UTC+8
              </span>

            </div>


            {/* DATE */}

            <div
              className="
                mt-1
                pl-[26px]
                text-[10px]
                tracking-wide
                text-gray-400
                dark:text-gray-500
              "
            >
              {philippinesDate}
            </div>

          </div>


          {/* ========================================= */}
          {/* LIVE VISITOR MONITORING */}
          {/* ========================================= */}

          <div
            className="
              border-t
              border-black/10
              pt-5
              dark:border-white/10
            "
          >

            {/* LIVE INDICATOR */}

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <span
                className="
                  relative
                  flex
                  h-2
                  w-2
                "
              >

                {onlineVisitors > 0 && (
                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-cyan-400
                      opacity-60
                    "
                  />
                )}


                <span
                  className={`
                    relative
                    inline-flex
                    h-2
                    w-2
                    rounded-full

                    ${
                      onlineVisitors > 0
                        ? "bg-cyan-400"
                        : "bg-gray-300 dark:bg-gray-700"
                    }
                  `}
                />

              </span>


              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-gray-400
                  dark:text-gray-500
                "
              >
                Live now
              </span>

            </div>


            {/* AVATARS */}

            <div
              className="
                mt-4
                flex
                items-center
              "
            >

              <div
                className="
                  flex
                  items-center
                "
              >

                {visibleVisitors.map(
                  (visitor, index) => (

                    <div
                      key={visitor.id}
                      className={`
                        relative
                        h-9
                        w-9
                        overflow-hidden
                        rounded-full
                        border-2
                        border-white
                        bg-gray-100
                        shadow-sm
                        dark:border-[#080808]
                        dark:bg-[#171717]

                        ${
                          index > 0
                            ? "-ml-2"
                            : ""
                        }
                      `}
                      title="Anonymous visitor"
                    >

                      <img
                        src={getAvatar(
                          visitor,
                          index
                        )}
                        alt="Anonymous visitor"
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />

                    </div>

                  )
                )}


                {/* EMPTY STATE */}

                {onlineVisitors === 0 && (

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      border-white
                      bg-gray-100
                      text-[10px]
                      font-medium
                      text-gray-400
                      dark:border-[#080808]
                      dark:bg-[#171717]
                      dark:text-gray-500
                    "
                  >
                    —
                  </div>

                )}


                {/* REMAINING VISITORS */}

                {remainingVisitors > 0 && (

                  <div
                    className="
                      -ml-2
                      flex
                      h-9
                      min-w-9
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      border-white
                      bg-gray-100
                      px-1.5
                      text-[10px]
                      font-semibold
                      text-gray-600
                      shadow-sm
                      dark:border-[#080808]
                      dark:bg-[#171717]
                      dark:text-gray-300
                    "
                  >
                    +{remainingVisitors}
                  </div>

                )}

              </div>

            </div>


            {/* VISITOR TEXT */}

            <div className="mt-3">

              <p
                className="
                  text-xs
                  text-gray-500
                  dark:text-gray-400
                "
              >

                {onlineVisitors === 0
                  ? "No one is viewing"
                  : onlineVisitors === 1
                    ? "1 person viewing"
                    : `${onlineVisitors} people viewing`}

              </p>

            </div>

          </div>


          {/* ========================================= */}
          {/* EMAIL */}
          {/* ========================================= */}

          <div>

            <p
              className="
                mb-3
                text-xs
                leading-5
                text-gray-500
                dark:text-gray-400
              "
            >
              Always open to new opportunities
              and interesting projects.
            </p>


            <a
              href="mailto:mercadoelfren@gmail.com"
              data-interactive
              onClick={closeMobileMenu}
              className="
                group
                flex
                cursor-pointer
                select-none
                items-center
                gap-3
                text-xs
                text-gray-500
                transition-colors
                duration-300
                hover:text-gray-900
                dark:text-gray-500
                dark:hover:text-white
              "
            >

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >

                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                />

                <path
                  d="m3 7 9 6 9-6"
                />

              </svg>


              <span>
                mercadoelfren@gmail.com
              </span>

            </a>

          </div>


          {/* ========================================= */}
          {/* THEME TOGGLE */}
          {/* ========================================= */}

          <ThemeToggle />

        </div>

      </aside>


      {/* ================================================= */}
      {/* DESKTOP SIDEBAR */}
      {/* ================================================= */}

      <aside
        className="
          fixed
          left-0
          top-0
          z-50
          hidden
          h-screen
          w-64
          flex-col
          border-r
          border-black/10
          bg-white/80
          px-8
          py-8
          backdrop-blur-md
          dark:border-white/10
          dark:bg-[#080808]/80
          lg:flex
        "
      >

        {/* ========================================= */}
        {/* LOGO */}
        {/* ========================================= */}

        <a
          href="#"
          data-interactive
          onClick={handleLogoClick}
          className="
            flex
            cursor-pointer
            select-none
            items-center
          "
        >

          <img
            src={logo}
            alt="ERC Logo"
            className="
              h-10
              w-auto
              object-contain
            "
          />

        </a>


        {/* ========================================= */}
        {/* NAVIGATION */}
        {/* ========================================= */}

        <nav
          className="
            relative
            mt-16
            flex
            flex-col
            gap-5
          "
        >

          {/* MOVING ARROW */}

          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-0
              z-10
              flex
              h-5
              w-4
              items-center
              text-xs
              text-gray-900
              transition-[top]
              duration-300
              ease-[cubic-bezier(0.22,1,0.36,1)]
              dark:text-white
            "
            style={{
              top: `${arrowPosition}px`,
            }}
          >
            →
          </span>


          {/* NAVIGATION ITEMS */}

          {navigationItems.map((item) => {

            const isActive =
              activeSection === item.id


            return (
              <button
                key={item.id}
                type="button"
                data-interactive
                onClick={() =>
                  handleNavigation(item.id)
                }
                className={`
                  group
                  flex
                  h-5
                  cursor-pointer
                  select-none
                  items-center
                  gap-3
                  border-0
                  bg-transparent
                  p-0
                  pl-7
                  text-left
                  text-sm
                  outline-none
                  transition-colors
                  duration-300

                  ${
                    isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }
                `}
              >

                <span
                  className="
                    transition-colors
                    duration-300
                    group-hover:text-gray-900
                    dark:group-hover:text-white
                  "
                >
                  {item.label}
                </span>

              </button>
            )

          })}

        </nav>


        {/* ========================================= */}
        {/* BOTTOM AREA */}
        {/* ========================================= */}

        <div
          className="
            mt-auto
            flex
            flex-col
            gap-6
          "
        >

          {/* LOCATION & REALTIME DATE/TIME */}

          <div
            className="
              border-t
              border-black/10
              pt-5
              dark:border-white/10
            "
          >

            {/* LOCATION */}

            <div
              className="
                flex
                items-center
                gap-2.5
                text-gray-500
                dark:text-gray-400
              "
            >

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="
                  shrink-0
                  text-gray-400
                  dark:text-gray-500
                "
              >

                <path
                  d="
                    M20 10
                    c0 5-8 11-8 11
                    S4 15 4 10
                    a8 8 0 1 1 16 0Z
                  "
                />

                <circle
                  cx="12"
                  cy="10"
                  r="2.5"
                />

              </svg>


              <span
                className="
                  text-xs
                  leading-5
                "
              >
                Lipa City, Philippines
              </span>

            </div>


            {/* REALTIME TIME */}

            <div
              className="
                mt-2
                flex
                items-center
                gap-2.5
                text-gray-500
                dark:text-gray-400
              "
            >

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="
                  shrink-0
                  text-gray-400
                  dark:text-gray-500
                "
              >

                <circle
                  cx="12"
                  cy="12"
                  r="9"
                />

                <path
                  d="M12 7v5l3 2"
                />

              </svg>


              <span
                className="
                  font-mono
                  text-xs
                  leading-5
                  tracking-tight
                "
              >
                {philippinesTime}
                {" · "}
                PHT
                {" · "}
                UTC+8
              </span>

            </div>


            {/* DATE */}

            <div
              className="
                mt-1
                pl-[26px]
                text-[10px]
                tracking-wide
                text-gray-400
                dark:text-gray-500
              "
            >
              {philippinesDate}
            </div>

          </div>


          {/* ========================================= */}
          {/* LIVE VISITOR MONITORING */}
          {/* ========================================= */}

          <div
            className="
              border-t
              border-black/10
              pt-5
              dark:border-white/10
            "
          >

            {/* LIVE INDICATOR */}

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <span
                className="
                  relative
                  flex
                  h-2
                  w-2
                "
              >

                {onlineVisitors > 0 && (
                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-cyan-400
                      opacity-60
                    "
                  />
                )}


                <span
                  className={`
                    relative
                    inline-flex
                    h-2
                    w-2
                    rounded-full

                    ${
                      onlineVisitors > 0
                        ? "bg-cyan-400"
                        : "bg-gray-300 dark:bg-gray-700"
                    }
                  `}
                />

              </span>


              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.2em]
                  text-gray-400
                  dark:text-gray-500
                "
              >
                Live now
              </span>

            </div>


            {/* AVATARS */}

            <div
              className="
                mt-4
                flex
                items-center
              "
            >

              <div
                className="
                  flex
                  items-center
                "
              >

                {visibleVisitors.map(
                  (visitor, index) => (

                    <div
                      key={visitor.id}
                      className={`
                        relative
                        h-9
                        w-9
                        overflow-hidden
                        rounded-full
                        border-2
                        border-white
                        bg-gray-100
                        shadow-sm
                        dark:border-[#080808]
                        dark:bg-[#171717]

                        ${
                          index > 0
                            ? "-ml-2"
                            : ""
                        }
                      `}
                      title="Anonymous visitor"
                    >

                      <img
                        src={getAvatar(
                          visitor,
                          index
                        )}
                        alt="Anonymous visitor"
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />

                    </div>

                  )
                )}


                {/* EMPTY STATE */}

                {onlineVisitors === 0 && (

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      border-white
                      bg-gray-100
                      text-[10px]
                      font-medium
                      text-gray-400
                      dark:border-[#080808]
                      dark:bg-[#171717]
                      dark:text-gray-500
                    "
                  >
                    —
                  </div>

                )}


                {/* REMAINING VISITORS */}

                {remainingVisitors > 0 && (

                  <div
                    className="
                      -ml-2
                      flex
                      h-9
                      min-w-9
                      items-center
                      justify-center
                      rounded-full
                      border-2
                      border-white
                      bg-gray-100
                      px-1.5
                      text-[10px]
                      font-semibold
                      text-gray-600
                      shadow-sm
                      dark:border-[#080808]
                      dark:bg-[#171717]
                      dark:text-gray-300
                    "
                  >
                    +{remainingVisitors}
                  </div>

                )}

              </div>

            </div>


            {/* VISITOR TEXT */}

            <div className="mt-3">

              <p
                className="
                  text-xs
                  text-gray-500
                  dark:text-gray-400
                "
              >

                {onlineVisitors === 0
                  ? "No one is viewing"
                  : onlineVisitors === 1
                    ? "1 person viewing"
                    : `${onlineVisitors} people viewing`}

              </p>

            </div>

          </div>


          {/* ========================================= */}
          {/* EMAIL */}
          {/* ========================================= */}

          <div>

            <p
              className="
                mb-3
                text-xs
                leading-5
                text-gray-500
                dark:text-gray-400
              "
            >
              Always open to new opportunities
              and interesting projects.
            </p>


            <a
              href="mailto:mercadoelfren@gmail.com"
              data-interactive
              className="
                group
                flex
                cursor-pointer
                select-none
                items-center
                gap-3
                text-xs
                text-gray-500
                transition-colors
                duration-300
                hover:text-gray-900
                dark:text-gray-500
                dark:hover:text-white
              "
            >

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >

                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                />

                <path
                  d="m3 7 9 6 9-6"
                />

              </svg>


              <span>
                mercadoelfren@gmail.com
              </span>

            </a>


          </div>


          {/* ========================================= */}
          {/* THEME TOGGLE */}
          {/* ========================================= */}

          <ThemeToggle />

        </div>

      </aside>

    </>
  )
}


export default Sidebar