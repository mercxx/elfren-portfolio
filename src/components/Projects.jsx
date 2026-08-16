import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { projects } from "../data/projects"

function Projects() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const imageSliderRef = useRef(null)

  /*
   * =========================================
   * FEATURED AUTOMATION PROJECTS
   * =========================================
   */

  const automationProjects = useMemo(() => {
    if (!projects || projects.length === 0) {
      return []
    }

    const filtered = projects.filter((project) => {
      const category =
        project.category?.toLowerCase() || ""

      const type =
        project.type?.toLowerCase() || ""

      return (
        category.includes("automation") ||
        type.includes("automation")
      )
    })

    return filtered.length > 0
      ? filtered
      : projects
  }, [])

  /*
   * =========================================
   * RESET ACTIVE PROJECT
   * =========================================
   */

  useEffect(() => {
    setActiveIndex(0)
  }, [automationProjects.length])

  /*
   * =========================================
   * AUTOMATIC SHUFFLE
   * =========================================
   */

  useEffect(() => {
    if (automationProjects.length <= 1) {
      return
    }

    if (selectedProject) {
      return
    }

    const interval = setInterval(() => {
      setActiveIndex((current) => {
        return (
          (current + 1) %
          automationProjects.length
        )
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [
    automationProjects.length,
    selectedProject,
  ])

  /*
   * =========================================
   * KEYBOARD ESCAPE
   * =========================================
   */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null)
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
  }, [])

  /*
   * =========================================
   * PREVENT BACKGROUND SCROLL WHEN MODAL
   * IS OPEN
   * =========================================
   */

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedProject])

  /*
   * =========================================
   * EMPTY STATE
   * =========================================
   */

  if (!projects || projects.length === 0) {
    return null
  }

  /*
   * =========================================
   * FEATURED PROJECT DATA
   * =========================================
   */

  const totalFeatured =
    automationProjects.length

  const getFeaturedIndex = (offset) => {
    if (totalFeatured === 0) {
      return 0
    }

    return (
      (activeIndex +
        offset +
        totalFeatured) %
      totalFeatured
    )
  }

  const activeProject =
    automationProjects[activeIndex]

  const leftProject =
    automationProjects[
      getFeaturedIndex(-1)
    ]

  const rightProject =
    automationProjects[
      getFeaturedIndex(1)
    ]

  /*
   * =========================================
   * CHANGE FEATURED PROJECT
   * =========================================
   */

  const goToProject = (index) => {
    setActiveIndex(index)
  }

  /*
   * =========================================
   * OPEN PROJECT DETAILS
   * =========================================
   */

  const openProject = (project) => {
    setSelectedProject(project)
    setActiveImageIndex(0)

    if (imageSliderRef.current) {
      imageSliderRef.current.scrollTo({
        left: 0,
        behavior: "instant",
      })
    }
  }

  /*
   * =========================================
   * CLOSE PROJECT DETAILS
   * =========================================
   */

  const closeProject = () => {
    setSelectedProject(null)
    setActiveImageIndex(0)
  }

  /*
   * =========================================
   * PROJECT IMAGE DATA
   * =========================================
   */

  const selectedProjectImages =
    selectedProject?.detailImages?.length > 0
      ? selectedProject.detailImages
      : selectedProject?.detailImage
        ? [selectedProject.detailImage]
        : []

  /*
   * =========================================
   * IMAGE SLIDER
   * =========================================
   */

  const scrollToImage = (index) => {
    if (!imageSliderRef.current) {
      return
    }

    const slider =
      imageSliderRef.current

    const width = slider.clientWidth

    slider.scrollTo({
      left: width * index,
      behavior: "smooth",
    })

    setActiveImageIndex(index)
  }

  const handleImageScroll = () => {
    if (!imageSliderRef.current) {
      return
    }

    const slider =
      imageSliderRef.current

    const width = slider.clientWidth

    if (width === 0) {
      return
    }

    const index = Math.round(
      slider.scrollLeft / width
    )

    setActiveImageIndex(
      Math.max(
        0,
        Math.min(
          index,
          selectedProjectImages.length - 1
        )
      )
    )
  }

  const previousImage = () => {
    if (selectedProjectImages.length <= 1) {
      return
    }

    const previous =
      activeImageIndex === 0
        ? selectedProjectImages.length - 1
        : activeImageIndex - 1

    scrollToImage(previous)
  }

  const nextImage = () => {
    if (selectedProjectImages.length <= 1) {
      return
    }

    const next =
      activeImageIndex ===
      selectedProjectImages.length - 1
        ? 0
        : activeImageIndex + 1

    scrollToImage(next)
  }

  /*
   * =========================================
   * PROJECT DETAIL MODAL
   * =========================================
   */

  const projectModal =
    selectedProject &&
    typeof document !== "undefined"
      ? createPortal(
          <div
            className="
              fixed
              inset-0
              z-[9999]
              overflow-y-auto
              overscroll-contain
              bg-black/60
              px-4
              py-6
              backdrop-blur-sm
              sm:px-6
              sm:py-8
            "
            onClick={closeProject}
          >

            {/* ========================================= */}
            {/* MODAL CENTERING WRAPPER */}
            {/* ========================================= */}

            <div
              className="
                flex
                min-h-full
                w-full
                items-start
                justify-center
              "
            >

              {/* ========================================= */}
              {/* MODAL */}
              {/* ========================================= */}

              <div
                className="
                  relative
                  my-2
                  w-full
                  max-w-[900px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#0b0b0c]
                  shadow-2xl
                  sm:my-4
                  md:my-6
                "
                onClick={(event) =>
                  event.stopPropagation()
                }
              >

                {/* ========================================= */}
                {/* CLOSE */}
                {/* ========================================= */}

                <button
                  type="button"
                  data-interactive
                  onClick={closeProject}
                  aria-label="Close project"
                  className="
                    absolute
                    right-5
                    top-5
                    z-30
                    flex
                    h-9
                    w-9
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-black/60
                    text-base
                    text-gray-400
                    backdrop-blur-md
                    transition
                    hover:text-white
                  "
                >
                  ×
                </button>

                {/* ========================================= */}
                {/* PROJECT IMAGE SWIPER */}
                {/* ========================================= */}

                {selectedProjectImages.length > 0 && (
                  <div
                    className="
                      relative
                      w-full
                      overflow-hidden
                      bg-white/[0.03]
                    "
                  >

                    {/* IMAGE TRACK */}

                    <div
                      ref={imageSliderRef}
                      onScroll={handleImageScroll}
                      className="
                        flex
                        w-full
                        snap-x
                        snap-mandatory
                        overflow-x-auto
                        overscroll-x-contain
                        scroll-smooth
                        scrollbar-hide
                        touch-pan-x
                      "
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >

                      {selectedProjectImages.map(
                        (image, index) => (
                          <div
                            key={image}
                            className="
                              flex
                              h-[240px]
                              w-full
                              shrink-0
                              snap-center
                              snap-always
                              items-center
                              justify-center
                              px-4
                              py-5
                              sm:h-[360px]
                              sm:px-6
                              sm:py-6
                              md:h-[440px]
                              md:px-8
                              md:py-8
                            "
                          >

                            <img
                              src={image}
                              alt={`${selectedProject.title} image ${index + 1}`}
                              draggable="false"
                              className="
                                max-h-full
                                max-w-full
                                select-none
                                object-contain
                                drop-shadow-[0_15px_35px_rgba(0,0,0,0.35)]
                              "
                            />

                          </div>
                        )
                      )}

                    </div>

                    {/* ========================================= */}
                    {/* PREVIOUS BUTTON */}
                    {/* ========================================= */}

                    {selectedProjectImages.length > 1 && (
                      <button
                        type="button"
                        data-interactive
                        onClick={previousImage}
                        aria-label="Previous project image"
                        className="
                          absolute
                          left-4
                          top-1/2
                          z-20
                          flex
                          h-9
                          w-9
                          -translate-y-1/2
                          cursor-pointer
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/10
                          bg-black/50
                          text-sm
                          text-gray-300
                          backdrop-blur-md
                          transition-all
                          duration-300
                          hover:scale-110
                          hover:bg-black/70
                          hover:text-white
                          sm:left-5
                        "
                      >
                        ←
                      </button>
                    )}

                    {/* ========================================= */}
                    {/* NEXT BUTTON */}
                    {/* ========================================= */}

                    {selectedProjectImages.length > 1 && (
                      <button
                        type="button"
                        data-interactive
                        onClick={nextImage}
                        aria-label="Next project image"
                        className="
                          absolute
                          right-4
                          top-1/2
                          z-20
                          flex
                          h-9
                          w-9
                          -translate-y-1/2
                          cursor-pointer
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/10
                          bg-black/50
                          text-sm
                          text-gray-300
                          backdrop-blur-md
                          transition-all
                          duration-300
                          hover:scale-110
                          hover:bg-black/70
                          hover:text-white
                          sm:right-5
                        "
                      >
                        →
                      </button>
                    )}

                    {/* ========================================= */}
                    {/* IMAGE COUNTER */}
                    {/* ========================================= */}

                    {selectedProjectImages.length > 1 && (
                      <div
                        className="
                          absolute
                          bottom-4
                          left-1/2
                          z-20
                          -translate-x-1/2
                          rounded-full
                          border
                          border-white/10
                          bg-black/50
                          px-3
                          py-1
                          text-[9px]
                          tabular-nums
                          tracking-[0.12em]
                          text-gray-300
                          backdrop-blur-md
                        "
                      >
                        {String(
                          activeImageIndex + 1
                        ).padStart(2, "0")}{" "}
                        /{" "}
                        {String(
                          selectedProjectImages.length
                        ).padStart(2, "0")}
                      </div>
                    )}

                    {/* ========================================= */}
                    {/* IMAGE DOTS */}
                    {/* ========================================= */}

                    {selectedProjectImages.length > 1 && (
                      <div
                        className="
                          absolute
                          bottom-4
                          left-1/2
                          flex
                          -translate-x-1/2
                          translate-y-8
                          items-center
                          gap-1.5
                        "
                      >

                        {selectedProjectImages.map(
                          (image, index) => (
                            <button
                              key={image}
                              type="button"
                              data-interactive
                              onClick={() =>
                                scrollToImage(index)
                              }
                              aria-label={`Show image ${index + 1}`}
                              className={`
                                h-1
                                cursor-pointer
                                rounded-full
                                transition-all
                                duration-500
                                ${
                                  index ===
                                  activeImageIndex
                                    ? "w-6 bg-white"
                                    : "w-1.5 bg-white/30"
                                }
                              `}
                            />
                          )
                        )}

                      </div>
                    )}

                  </div>
                )}

                {/* ========================================= */}
                {/* PROJECT INFORMATION */}
                {/* ========================================= */}

                <div className="p-7 sm:p-9">

                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-[0.2em]
                      text-gray-500
                    "
                  >
                    {selectedProject.category}
                  </p>

                  <h2
                    className="
                      mt-3
                      max-w-[700px]
                      text-2xl
                      font-medium
                      leading-tight
                      tracking-tight
                      text-white
                      sm:text-3xl
                    "
                  >
                    {selectedProject.title}
                  </h2>

                  <div
                    className="
                      mt-4
                      flex
                      flex-wrap
                      gap-x-5
                      gap-y-2
                    "
                  >

                    {selectedProject.date && (
                      <p
                        className="
                          text-[10px]
                          uppercase
                          tracking-[0.15em]
                          text-gray-500
                        "
                      >
                        {selectedProject.date}
                      </p>
                    )}

                    {selectedProject.status && (
                      <p
                        className="
                          text-[10px]
                          uppercase
                          tracking-[0.15em]
                          text-gray-500
                        "
                      >
                        {selectedProject.status}
                      </p>
                    )}

                  </div>

                  <p
                    className="
                      mt-7
                      max-w-[760px]
                      text-sm
                      leading-7
                      text-gray-400
                    "
                  >
                    {selectedProject.description}
                  </p>

                  {/* ========================================= */}
                  {/* TECHNOLOGIES */}
                  {/* ========================================= */}

                  {selectedProject.technologies?.length >
                    0 && (
                    <div className="mt-8">

                      <p
                        className="
                          text-[9px]
                          uppercase
                          tracking-[0.2em]
                          text-gray-600
                        "
                      >
                        Technologies
                      </p>

                      <div
                        className="
                          mt-3
                          flex
                          flex-wrap
                          gap-2
                        "
                      >

                        {selectedProject.technologies.map(
                          (technology) => (
                            <span
                              key={technology}
                              className="
                                rounded-md
                                border
                                border-white/10
                                px-2.5
                                py-1.5
                                text-[10px]
                                text-gray-400
                              "
                            >
                              {technology}
                            </span>
                          )
                        )}

                      </div>

                    </div>
                  )}

                  {/* ========================================= */}
                  {/* ADDITIONAL SCREENSHOTS */}
                  {/* ========================================= */}

                  {selectedProject.screenshots?.length >
                    0 && (
                    <div className="mt-9">

                      <p
                        className="
                          mb-4
                          text-[9px]
                          uppercase
                          tracking-[0.2em]
                          text-gray-600
                        "
                      >
                        Screenshots
                      </p>

                      <div className="space-y-4">

                        {selectedProject.screenshots.map(
                          (screenshot, index) => (
                            <img
                              key={screenshot}
                              src={screenshot}
                              alt={`${selectedProject.title} screenshot ${index + 1}`}
                              className="
                                block
                                h-auto
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                object-contain
                              "
                            />
                          )
                        )}

                      </div>

                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>,
          document.body
        )
      : null

  return (
    <>
      <section
        id="projects"
        className="
          border-t
          border-black/10
          py-20
          dark:border-white/10
          lg:py-24
        "
      >

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div
          className="
            mb-10
            flex
            items-end
            justify-between
          "
        >

          <p
            className="
              display-label
              text-gray-400
              dark:text-gray-500
            "
          >
            02 — Projects
          </p>

          <a
            href="#all-projects"
            data-interactive
            className="
              cursor-pointer
              select-none
              text-xs
              font-medium
              uppercase
              tracking-[0.15em]
              text-gray-400
              transition
              duration-300
              hover:text-gray-900
              dark:text-gray-500
              dark:hover:text-white
            "
          >
            All Projects →
          </a>

        </div>

        {/* ========================================= */}
        {/* FEATURED LABEL */}
        {/* ========================================= */}

        <div className="mb-6">

          <p
            className="
              text-xs
              text-gray-500
              dark:text-gray-500
            "
          >
            Featured Automations
          </p>

        </div>

        {/* ========================================= */}
        {/* PROJECT STACK */}
        {/* ========================================= */}

        <div
          className="
            relative
            mx-auto
            h-[410px]
            w-full
          "
        >

          {/* ========================================= */}
          {/* LEFT CARD */}
          {/* ========================================= */}

          {totalFeatured > 1 && (
            <button
              type="button"
              data-interactive
              onClick={() =>
                goToProject(
                  getFeaturedIndex(-1)
                )
              }
              aria-label={`View ${leftProject.title}`}
              className="
                group
                absolute
                left-1/2
                top-1/2
                z-10
                hidden
                h-[280px]
                w-[300px]
                -translate-x-[94%]
                -translate-y-1/2
                -rotate-[10deg]
                cursor-pointer
                overflow-hidden
                rounded-2xl
                border
                border-black/10
                bg-gray-50
                text-left
                opacity-60
                shadow-sm
                transition-all
                duration-700
                hover:-translate-x-[98%]
                hover:opacity-80
                dark:border-white/10
                dark:bg-[#0a0a0b]
                md:block
              "
            >

              <div
                className="
                  h-[145px]
                  overflow-hidden
                  bg-gray-100
                  dark:bg-white/[0.03]
                "
              >

                {leftProject.image ? (
                  <img
                    src={leftProject.image}
                    alt={leftProject.title}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition
                      duration-700
                      group-hover:scale-105
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      items-center
                      justify-center
                    "
                  >
                    <span
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.18em]
                        text-gray-400
                      "
                    >
                      Automation
                    </span>
                  </div>
                )}

              </div>

              <div className="p-5">

                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    text-gray-400
                  "
                >
                  {leftProject.category}
                </p>

                <h3
                  className="
                    mt-3
                    line-clamp-1
                    text-base
                    font-medium
                    text-gray-600
                    dark:text-gray-300
                  "
                >
                  {leftProject.title}
                </h3>

              </div>

            </button>
          )}

          {/* ========================================= */}
          {/* RIGHT CARD */}
          {/* ========================================= */}

          {totalFeatured > 2 && (
            <button
              type="button"
              data-interactive
              onClick={() =>
                goToProject(
                  getFeaturedIndex(1)
                )
              }
              aria-label={`View ${rightProject.title}`}
              className="
                group
                absolute
                left-1/2
                top-1/2
                z-10
                hidden
                h-[280px]
                w-[300px]
                -translate-x-[6%]
                -translate-y-1/2
                rotate-[10deg]
                cursor-pointer
                overflow-hidden
                rounded-2xl
                border
                border-black/10
                bg-gray-50
                text-left
                opacity-60
                shadow-sm
                transition-all
                duration-700
                hover:translate-x-[2%]
                hover:opacity-80
                dark:border-white/10
                dark:bg-[#0a0a0b]
                md:block
              "
            >

              <div
                className="
                  h-[145px]
                  overflow-hidden
                  bg-gray-100
                  dark:bg-white/[0.03]
                "
              >

                {rightProject.image ? (
                  <img
                    src={rightProject.image}
                    alt={rightProject.title}
                    className="
                      h-full
                      w-full
                      object-cover
                      transition
                      duration-700
                      group-hover:scale-105
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-full
                      items-center
                      justify-center
                    "
                  >
                    <span
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.18em]
                        text-gray-400
                      "
                    >
                      Automation
                    </span>
                  </div>
                )}

              </div>

              <div className="p-5">

                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    text-gray-400
                  "
                >
                  {rightProject.category}
                </p>

                <h3
                  className="
                    mt-3
                    line-clamp-1
                    text-base
                    font-medium
                    text-gray-600
                    dark:text-gray-300
                  "
                >
                  {rightProject.title}
                </h3>

              </div>

            </button>
          )}

          {/* ========================================= */}
          {/* CENTER FEATURED CARD */}
          {/* ========================================= */}

          <button
            type="button"
            data-interactive
            onClick={() =>
              openProject(activeProject)
            }
            aria-label={`Open ${activeProject.title}`}
            className="
              group
              absolute
              left-1/2
              top-1/2
              z-30
              h-[350px]
              w-full
              max-w-[430px]
              -translate-x-1/2
              -translate-y-1/2
              cursor-pointer
              overflow-hidden
              rounded-2xl
              border
              border-black/10
              bg-white
              text-left
              shadow-[0_18px_50px_rgba(0,0,0,0.08)]
              transition-all
              duration-700
              hover:-translate-x-1/2
              hover:-translate-y-[51%]
              dark:border-white/10
              dark:bg-[#0b0b0c]
              dark:shadow-[0_18px_50px_rgba(0,0,0,0.35)]
            "
          >

            <div
              className="
                h-[165px]
                overflow-hidden
                bg-gray-100
                dark:bg-white/[0.03]
              "
            >

              {activeProject.image ? (
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-700
                    group-hover:scale-[1.02]
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    items-center
                    justify-center
                  "
                >
                  <div className="text-center">

                    <p
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.2em]
                        text-gray-400
                      "
                    >
                      Featured Automation
                    </p>

                    <p
                      className="
                        mt-2
                        text-xs
                        text-gray-500
                      "
                    >
                      {activeProject.category}
                    </p>

                  </div>
                </div>
              )}

            </div>

            <div className="p-5">

              <div className="flex items-center gap-2">

                <span
                  className="
                    rounded-full
                    border
                    border-black/10
                    px-3
                    py-1
                    text-[9px]
                    uppercase
                    tracking-[0.12em]
                    text-gray-500
                    dark:border-white/10
                    dark:text-gray-400
                  "
                >
                  {activeProject.category}
                </span>

              </div>

              <h3
                className="
                  mt-4
                  text-xl
                  font-medium
                  leading-tight
                  tracking-tight
                  text-gray-900
                  dark:text-white
                "
              >
                {activeProject.title}
              </h3>

              <p
                className="
                  mt-3
                  line-clamp-2
                  text-sm
                  leading-6
                  text-gray-500
                  dark:text-gray-500
                "
              >
                {activeProject.description}
              </p>

              <div
                className="
                  mt-4
                  flex
                  flex-wrap
                  gap-1.5
                "
              >

                {activeProject.technologies
                  ?.slice(0, 4)
                  .map((technology) => (
                    <span
                      key={technology}
                      className="
                        rounded-md
                        border
                        border-black/10
                        px-2
                        py-1
                        text-[9px]
                        text-gray-500
                        dark:border-white/10
                        dark:text-gray-500
                      "
                    >
                      {technology}
                    </span>
                  ))}

              </div>

            </div>

          </button>

        </div>

        {/* ========================================= */}
        {/* PROJECT INDICATORS */}
        {/* ========================================= */}

        <div
          className="
            mt-4
            flex
            items-center
            justify-center
            gap-2
          "
        >

          {automationProjects.map(
            (project, index) => (
              <button
                key={project.title}
                type="button"
                data-interactive
                onClick={() =>
                  goToProject(index)
                }
                aria-label={`Show ${project.title}`}
                className={`
                  h-1.5
                  cursor-pointer
                  rounded-full
                  transition-all
                  duration-500
                  ${
                    index === activeIndex
                      ? "w-7 bg-gray-900 dark:bg-white"
                      : "w-1.5 bg-gray-300 dark:bg-gray-700"
                  }
                `}
              />
            )
          )}

        </div>

        {/* ========================================= */}
        {/* FEATURED COUNTER */}
        {/* ========================================= */}

        <div
          className="
            mt-5
            flex
            items-center
            justify-between
          "
        >

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.15em]
              text-gray-400
              dark:text-gray-600
            "
          >
            Automation Showcase
          </p>

          <p
            className="
              text-[10px]
              tabular-nums
              text-gray-400
              dark:text-gray-600
            "
          >
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(totalFeatured).padStart(2, "0")}
          </p>

        </div>

        {/* ========================================= */}
        {/* ALL PROJECTS */}
        {/* ========================================= */}

        <div
          id="all-projects"
          className="
            mt-20
            border-t
            border-black/10
            pt-8
            dark:border-white/10
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
            "
          >

            <p
              className="
                display-label
                text-gray-400
                dark:text-gray-500
              "
            >
              All Projects
            </p>

            <p
              className="
                text-[10px]
                text-gray-400
                dark:text-gray-600
              "
            >
              {projects.length} projects
            </p>

          </div>

          <div className="mt-6">

            {projects.map(
              (project, index) => (
                <button
                  key={project.title}
                  type="button"
                  data-interactive
                  onClick={() =>
                    openProject(project)
                  }
                  className="
                    group
                    flex
                    w-full
                    cursor-pointer
                    items-center
                    justify-between
                    border-b
                    border-black/10
                    py-5
                    text-left
                    transition
                    duration-300
                    hover:px-1
                    dark:border-white/10
                  "
                >

                  <div
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-5
                    "
                  >

                    <span
                      className="
                        shrink-0
                        text-[10px]
                        tabular-nums
                        text-gray-400
                        dark:text-gray-600
                      "
                    >
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <div className="min-w-0">

                      <p
                        className="
                          truncate
                          text-sm
                          font-medium
                          text-gray-700
                          transition
                          group-hover:text-gray-900
                          dark:text-gray-400
                          dark:group-hover:text-white
                        "
                      >
                        {project.title}
                      </p>

                      <p
                        className="
                          mt-1
                          text-[10px]
                          text-gray-400
                          dark:text-gray-600
                        "
                      >
                        {project.category}
                      </p>

                    </div>

                  </div>

                  <span
                    className="
                      ml-4
                      shrink-0
                      text-sm
                      text-gray-400
                      transition
                      duration-300
                      group-hover:translate-x-1
                      group-hover:text-gray-900
                      dark:text-gray-600
                      dark:group-hover:text-white
                    "
                  >
                    →
                  </span>

                </button>
              )
            )}

          </div>

        </div>

      </section>

      {/* ========================================= */}
      {/* PROJECT DETAIL MODAL */}
      {/* ========================================= */}

      {projectModal}

    </>
  )
}

export default Projects