import { useEffect, useState } from "react"

import useVisitorPresence from "./lib/useVisitorPresence"
import InteractionSounds from "./components/InteractionSounds"
import Sidebar from "./components/Sidebar"

import Hero from "./components/Hero"
import About from "./components/About"
import Projects from "./components/Projects"
import Experience from "./components/Experience"
import Skills from "./components/Skills"
import Certificates from "./components/Certificates"


function App() {

  /*
   * =========================================
   * NAVIGATION SECTIONS
   * =========================================
   */

  const navigationSections = [
    "about",
    "projects",
    "experience",
    "skills",
    "certifications",
  ]


  /*
   * =========================================
   * SAVED NAVIGATION STATE
   * =========================================
   *
   * Restores the section the visitor was viewing
   * after refreshing the page.
   */

  const getSavedNavigationState = () => {

    try {

      const saved =
        sessionStorage.getItem(
          "portfolio-navigation-state"
        )

      if (!saved) {
        return null
      }

      const parsed =
        JSON.parse(saved)

      if (
        !parsed ||
        !navigationSections.includes(
          parsed.activeSection
        )
      ) {
        return null
      }

      return parsed

    } catch {
      return null
    }

  }


  const savedNavigationState =
    getSavedNavigationState()


  /*
   * =========================================
   * ACTIVE SECTION
   * =========================================
   */

  const [activeSection, setActiveSection] =
    useState(
      savedNavigationState?.activeSection ||
      "about"
    )


  /*
   * =========================================
   * VIEW MODE
   * =========================================
   *
   * scroll
   * = normal portfolio
   * = all sections visible
   *
   * focus
   * = only selected section visible
   */

  const [viewMode, setViewMode] =
    useState(
      savedNavigationState?.viewMode ||
      "scroll"
    )


  /*
   * =========================================
   * FOCUSED SECTION
   * =========================================
   */

  const [focusedSection, setFocusedSection] =
    useState(
      savedNavigationState?.focusedSection ||
      null
    )


  /*
   * =========================================
   * VISITOR PRESENCE
   * =========================================
   */

  const {
    onlineVisitors,
    visitors,
  } = useVisitorPresence()


  /*
   * =========================================
   * SAVE NAVIGATION STATE
   * =========================================
   *
   * Keeps the current section when the page
   * is refreshed.
   */

  useEffect(() => {

    try {

      sessionStorage.setItem(
        "portfolio-navigation-state",
        JSON.stringify({
          activeSection,
          viewMode,
          focusedSection,
        })
      )

    } catch {
      // Ignore storage errors
    }

  }, [
    activeSection,
    viewMode,
    focusedSection,
  ])


  /*
   * =========================================
   * SCROLL REVEAL ANIMATION
   * =========================================
   *
   * Sections start slightly lower, transparent,
   * and softly blurred.
   *
   * When a section enters the viewport it becomes
   * visible with a smooth upward motion.
   *
   * This affects ONLY the scroll animation.
   */

  useEffect(() => {

    if (viewMode !== "scroll") {
      return
    }


    const revealElements =
      document.querySelectorAll(
        "[data-scroll-reveal]"
      )


    if (!revealElements.length) {
      return
    }


    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches


    if (prefersReducedMotion) {

      revealElements.forEach((element) => {

        element.classList.add(
          "scroll-reveal-visible"
        )

      })

      return
    }


    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "scroll-reveal-visible"
              )

            }

          })

        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -8% 0px",
        }
      )


    revealElements.forEach((element) => {

      observer.observe(element)

    })


    return () => {

      observer.disconnect()

    }

  }, [viewMode])


  /*
   * =========================================
   * FIND ACTIVE SECTION WHILE SCROLLING
   * =========================================
   */

  useEffect(() => {

    if (viewMode !== "scroll") {
      return
    }


    const handleScroll = () => {

      const scrollPosition =
        window.scrollY +
        window.innerHeight * 0.35


      let currentSection = "about"


      navigationSections.forEach((sectionId) => {

        const section =
          document.getElementById(sectionId)


        if (!section) {
          return
        }


        const sectionTop =
          section.getBoundingClientRect().top +
          window.scrollY


        if (scrollPosition >= sectionTop) {
          currentSection = sectionId
        }

      })


      setActiveSection(currentSection)

    }


    handleScroll()


    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    )


    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      )

    }

  }, [viewMode])


  /*
   * =========================================
   * SIDEBAR SECTION CLICK
   * =========================================
   */

  const handleSectionChange = (sectionId) => {

    setActiveSection(sectionId)

    setFocusedSection(sectionId)

    setViewMode("focus")


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

  }


  /*
   * =========================================
   * RETURN TO NORMAL PORTFOLIO
   * =========================================
   */

  const handleReturnToScroll = () => {

    setViewMode("scroll")

    setFocusedSection(null)

    setActiveSection("about")


    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

  }


  /*
   * =========================================
   * RENDER INDIVIDUAL SECTION
   * =========================================
   */

  const renderSection = (sectionId) => {

    switch (sectionId) {

      case "about":
        return <About />

      case "projects":
        return <Projects />

      case "experience":
        return <Experience />

      case "skills":
        return <Skills />

      case "certifications":
        return <Certificates />

      default:
        return null

    }

  }


  /*
   * =========================================
   * NORMAL PORTFOLIO
   * =========================================
   */

  const renderNormalPortfolio = () => {

    return (
      <>
        {/* ========================================= */}
        {/* HERO */}
        {/* ========================================= */}

        <div
          data-scroll-reveal
          className="
            scroll-reveal
          "
        >
          <Hero />
        </div>


        {/* ========================================= */}
        {/* ABOUT */}
        {/* ========================================= */}

        <div
          data-scroll-reveal
          className="
            scroll-reveal
          "
        >
          <About />
        </div>


        {/* ========================================= */}
        {/* PROJECTS */}
        {/* ========================================= */}

        <div
          data-scroll-reveal
          className="
            scroll-reveal
          "
        >
          <Projects />
        </div>


        {/* ========================================= */}
        {/* EXPERIENCE */}
        {/* ========================================= */}

        <div
          data-scroll-reveal
          className="
            scroll-reveal
          "
        >
          <Experience />
        </div>


        {/* ========================================= */}
        {/* SKILLS */}
        {/* ========================================= */}

        <div
          data-scroll-reveal
          className="
            scroll-reveal
          "
        >
          <Skills />
        </div>


        {/* ========================================= */}
        {/* CERTIFICATIONS */}
        {/* ========================================= */}

        <div
          data-scroll-reveal
          className="
            scroll-reveal
          "
        >
          <Certificates />
        </div>

      </>
    )

  }


  /*
   * =========================================
   * FOCUSED PORTFOLIO
   * =========================================
   */

  const renderFocusedPortfolio = () => {

    if (!focusedSection) {
      return null
    }


    return (
      <div
        key={focusedSection}
        className="section-switch-animation"
      >
        {renderSection(focusedSection)}
      </div>
    )

  }


  return (
    <>
      {/* ========================================= */}
      {/* SCROLL REVEAL STYLES */}
      {/* ========================================= */}

      <style>
        {`
          /*
           * =========================================
           * SCROLL REVEAL
           * =========================================
           */

          .scroll-reveal {
            opacity: 0;
            transform:
              translate3d(0, 32px, 0)
              scale(0.985);
            filter: blur(4px);

            transition:
              opacity 900ms cubic-bezier(0.22, 1, 0.36, 1),
              transform 900ms cubic-bezier(0.22, 1, 0.36, 1),
              filter 900ms cubic-bezier(0.22, 1, 0.36, 1);

            will-change:
              opacity,
              transform,
              filter;
          }


          /*
           * Visible state
           */

          .scroll-reveal-visible {
            opacity: 1;
            transform:
              translate3d(0, 0, 0)
              scale(1);
            filter: blur(0);
          }


          /*
           * =========================================
           * REDUCED MOTION
           * =========================================
           */

          @media (prefers-reduced-motion: reduce) {

            .scroll-reveal {
              opacity: 1;
              transform: none;
              filter: none;
              transition: none;
            }

          }
        `}
      </style>


      {/* ========================================= */}
      {/* MAIN APPLICATION */}
      {/* ========================================= */}

      <div
        className="
          min-h-screen
          bg-white
          text-gray-900
          transition-colors
          dark:bg-[#050505]
          dark:text-white
        "
      >

        {/* ========================================= */}
        {/* SIDEBAR */}
        {/* ========================================= */}

        <Sidebar
          onlineVisitors={onlineVisitors}
          visitors={visitors}
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          onReturnToScroll={handleReturnToScroll}
          viewMode={viewMode}
        />


        {/* ========================================= */}
        {/* MAIN CONTENT AREA */}
        {/* ========================================= */}

        <main
          className="
            min-h-screen
            lg:ml-[260px]
          "
        >

          <InteractionSounds />


          {/* ========================================= */}
          {/* CENTERED PORTFOLIO FRAME */}
          {/* ========================================= */}

          <div
            className="
              portfolio-frame
              mx-auto
              w-full
              max-w-[920px]
              px-6
              sm:px-8
              lg:px-10
            "
          >

            {/* ========================================= */}
            {/* NORMAL MODE */}
            {/* ========================================= */}

            {viewMode === "scroll" && (
              <div>
                {renderNormalPortfolio()}
              </div>
            )}


            {/* ========================================= */}
            {/* FOCUS MODE */}
            {/* ========================================= */}

            {viewMode === "focus" && (
              renderFocusedPortfolio()
            )}

          </div>

        </main>

      </div>
    </>
  )
}


export default App