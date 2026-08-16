function Contact() {
  return (
    <section
      id="contact"
      className="bg-white px-6 py-24 text-center text-gray-900 transition-colors dark:bg-[#050505] dark:text-white"
    >
      <div className="mx-auto w-full max-w-7xl">

        <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-cyan-500 dark:text-cyan-400">
          06 — Contact
        </p>

        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Let's connect.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
          I'm open to opportunities where I can contribute my
          technical skills, continue learning, and work on meaningful
          technology projects.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <a
            href="mailto:your-email@example.com"
            className="rounded-lg bg-cyan-400 px-6 py-3 font-medium text-black transition hover:bg-cyan-300"
          >
            Email Me
          </a>

          <a
            href="#"
            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-900 transition hover:bg-gray-100 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
          >
            LinkedIn
          </a>

        </div>

      </div>
    </section>
  )
}

export default Contact