import { useEffect, useRef, useState } from "react"


function ScrollReveal({
  children,
  className = "",
}) {

  const elementRef = useRef(null)

  const [isVisible, setIsVisible] =
    useState(false)


  useEffect(() => {

    const element =
      elementRef.current


    if (!element) {
      return
    }


    const observer =
      new IntersectionObserver(
        ([entry]) => {

          if (entry.isIntersecting) {

            setIsVisible(true)

            observer.unobserve(element)

          }

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -60px 0px",
        }
      )


    observer.observe(element)


    return () => {

      observer.disconnect()

    }

  }, [])


  return (
    <div
      ref={elementRef}
      className={`
        transition-all
        duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]

        ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }

        ${className}
      `}
    >
      {children}
    </div>
  )

}


export default ScrollReveal