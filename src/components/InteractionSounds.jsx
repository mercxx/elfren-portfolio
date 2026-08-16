import { useEffect } from "react"


function InteractionSounds() {

  useEffect(() => {

    let audioContext = null
    let lastHoverTime = 0


    /*
     * =========================================
     * GET AUDIO CONTEXT
     * =========================================
     */

    const getAudioContext = () => {

      if (!audioContext) {
        audioContext = new (
          window.AudioContext ||
          window.webkitAudioContext
        )()
      }

      if (audioContext.state === "suspended") {
        audioContext.resume()
      }

      return audioContext
    }


    /*
     * =========================================
     * SOUND ENABLED?
     * =========================================
     */

    const soundEnabled = () => {
      return localStorage.getItem("sound") !== "off"
    }


    /*
     * =========================================
     * HOVER SOUND
     * =========================================
     */

    const playHoverSound = () => {

      if (!soundEnabled()) {
        return
      }


      /*
       * Prevent excessive sound triggering
       * when moving rapidly between children.
       */

      const now = Date.now()

      if (now - lastHoverTime < 45) {
        return
      }

      lastHoverTime = now


      const ctx = getAudioContext()

      const oscillator = ctx.createOscillator()
      const gain = ctx.createGain()


      oscillator.type = "sine"


      oscillator.frequency.setValueAtTime(
        1050,
        ctx.currentTime
      )

      oscillator.frequency.exponentialRampToValueAtTime(
        1250,
        ctx.currentTime + 0.045
      )


      /*
       * =========================================
       * HOVER VOLUME
       * =========================================
       *
       * Increased from 0.035 → 3.00
       */

      gain.gain.setValueAtTime(
        0.0001,
        ctx.currentTime
      )

      gain.gain.exponentialRampToValueAtTime(
        3.00,
        ctx.currentTime + 0.008
      )

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + 0.055
      )


      oscillator.connect(gain)
      gain.connect(ctx.destination)

      oscillator.start()
      oscillator.stop(
        ctx.currentTime + 0.06
      )

    }


    /*
     * =========================================
     * CLICK SOUND
     * =========================================
     */

    const playClickSound = () => {

      if (!soundEnabled()) {
        return
      }


      const ctx = getAudioContext()

      const oscillator = ctx.createOscillator()
      const gain = ctx.createGain()


      oscillator.type = "sine"


      oscillator.frequency.setValueAtTime(
        720,
        ctx.currentTime
      )

      oscillator.frequency.exponentialRampToValueAtTime(
        460,
        ctx.currentTime + 0.07
      )


      /*
       * =========================================
       * CLICK VOLUME
       * =========================================
       *
       * Increased from 0.07 → 5.00
       */

      gain.gain.setValueAtTime(
        0.0001,
        ctx.currentTime
      )

      gain.gain.exponentialRampToValueAtTime(
        5.00,
        ctx.currentTime + 0.008
      )

      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        ctx.currentTime + 0.085
      )


      oscillator.connect(gain)
      gain.connect(ctx.destination)

      oscillator.start()
      oscillator.stop(
        ctx.currentTime + 0.09
      )

    }


    /*
     * =========================================
     * FIND INTERACTIVE ELEMENT
     * =========================================
     */

    const getInteractiveElement = (target) => {

      if (!(target instanceof Element)) {
        return null
      }

      return target.closest(
        `
        a,
        button,
        [role="button"],
        input,
        select,
        textarea,
        [data-interactive]
        `
      )
    }


    /*
     * =========================================
     * HOVER HANDLER
     * =========================================
     */

    const handlePointerOver = (event) => {

      const element =
        getInteractiveElement(event.target)

      if (!element) {
        return
      }


      /*
       * Ignore movement between children of the
       * same interactive element.
       */

      const related =
        event.relatedTarget

      if (
        related instanceof Node &&
        element.contains(related)
      ) {
        return
      }


      playHoverSound()

    }


    /*
     * =========================================
     * CLICK HANDLER
     * =========================================
     */

    const handleClick = (event) => {

      const element =
        getInteractiveElement(event.target)

      if (!element) {
        return
      }


      /*
       * Don't play sound when clicking the
       * speaker control itself.
       */

      if (
        element.hasAttribute("data-sound-toggle")
      ) {
        return
      }


      playClickSound()

    }


    /*
     * =========================================
     * GLOBAL LISTENERS
     * =========================================
     */

    document.addEventListener(
      "pointerover",
      handlePointerOver,
      true
    )

    document.addEventListener(
      "click",
      handleClick,
      true
    )


    /*
     * =========================================
     * CLEANUP
     * =========================================
     */

    return () => {

      document.removeEventListener(
        "pointerover",
        handlePointerOver,
        true
      )

      document.removeEventListener(
        "click",
        handleClick,
        true
      )

    }

  }, [])


  return null
}


export default InteractionSounds