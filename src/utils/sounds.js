let audioContext = null

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (
      window.AudioContext ||
      window.webkitAudioContext
    )()
  }

  return audioContext
}

/*
  Game-style UI navigation tick
*/
function playUITick({
  frequency = 900,
  volume = 0.045,
  duration = 0.025,
} = {}) {
  try {
    const context = getAudioContext()

    if (context.state === "suspended") {
      context.resume()
    }

    const now = context.currentTime

    const oscillator = context.createOscillator()
    const gain = context.createGain()

    // Short, crisp UI sound
    oscillator.type = "square"

    oscillator.frequency.setValueAtTime(
      frequency,
      now
    )

    oscillator.frequency.exponentialRampToValueAtTime(
      frequency * 0.65,
      now + duration
    )

    gain.gain.setValueAtTime(
      0,
      now
    )

    gain.gain.linearRampToValueAtTime(
      volume,
      now + 0.001
    )

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      now + duration
    )

    oscillator.connect(gain)
    gain.connect(context.destination)

    oscillator.start(now)
    oscillator.stop(now + duration)

  } catch (error) {
    console.log("Audio unavailable:", error)
  }
}


/*
  HOVER
  Game-style navigation tick
*/
export function playHoverSound() {
  playUITick({
    frequency: 950,
    volume: 0.045,
    duration: 0.025,
  })
}


/*
  CLICK
  Slightly deeper confirmation sound
*/
export function playClickSound() {
  playUITick({
    frequency: 650,
    volume: 0.06,
    duration: 0.035,
  })
}


/*
  THEME TOGGLE
*/
export function playToggleSound() {
  playUITick({
    frequency: 800,
    volume: 0.05,
    duration: 0.03,
  })
}