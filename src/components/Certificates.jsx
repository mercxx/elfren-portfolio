function Certificates() {
  return (
    <div
      className="
        border-t
        border-black/10
        py-20
        dark:border-white/10
        lg:py-24
      "
    >

      {/* SECTION HEADER */}

      <div className="mb-12">

        <p
          className="
            display-label
            text-gray-400
            dark:text-gray-500
          "
        >
          05 — Certifications
        </p>

      </div>


      {/* DESCRIPTION */}

      <div className="mb-10">

        <h2
          className="
            max-w-[520px]
            text-2xl
            font-medium
            leading-[1.3]
            tracking-tight
            text-gray-900
            dark:text-white
            sm:text-3xl
          "
        >
          Learning beyond the classroom.
        </h2>

        <p
          className="
            mt-5
            max-w-[500px]
            text-sm
            leading-6
            text-gray-500
            dark:text-gray-400
          "
        >
          Certifications, training, and learning experiences
          that helped me expand my technical knowledge.
        </p>

      </div>


      {/* CERTIFICATES */}

      <div className="border-t border-black/10 dark:border-white/10">

        {/* ========================================= */}
        {/* CERTIFICATE 1 — CISCO */}
        {/* ========================================= */}

        <div
          className="
            grid
            gap-4
            border-b
            border-black/10
            py-6
            dark:border-white/10
            sm:grid-cols-[120px_1fr]
          "
        >

          {/* DATE */}

          <p className="text-xs text-gray-400 dark:text-gray-600">
            2025
          </p>


          {/* CERTIFICATE INFORMATION */}

          <div>

            <p
              className="
                text-xs
                uppercase
                tracking-[0.15em]
                text-gray-400
              "
            >
              Digital Badge
            </p>


            <h3
              className="
                mt-2
                text-sm
                font-medium
                text-gray-900
                dark:text-white
              "
            >
              CCNA: Switching, Routing, and Wireless Essentials
            </h3>


            <p
              className="
                mt-1
                text-xs
                text-gray-500
                dark:text-gray-500
              "
            >
              Cisco Networking Academy
            </p>


            {/* ========================================= */}
            {/* VERIFY BADGE */}
            {/* ========================================= */}

            <a
              href="https://www.credly.com/badges/58d2b15f-43fa-4167-a4df-ef8f8992285c"
              target="_blank"
              rel="noopener noreferrer"
              data-interactive
              className="
                mt-4
                inline-flex
                cursor-pointer
                select-none
                items-center
                gap-1.5
                text-xs
                font-medium
                text-gray-900
                transition-colors
                duration-300
                hover:text-gray-500
                dark:text-white
                dark:hover:text-gray-400
              "
            >
              Verify
              <span
                className="
                  text-[11px]
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                "
              >
                ↗
              </span>
            </a>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Certificates