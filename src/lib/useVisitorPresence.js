import { useEffect, useState } from "react"
import { supabase } from "./supabase"

function useVisitorPresence() {
  const [onlineVisitors, setOnlineVisitors] = useState(0)
  const [visitors, setVisitors] = useState([])

  useEffect(() => {

    /*
     * Supabase isn't configured.
     * Keep the portfolio working normally.
     */

    if (!supabase) {
      console.warn(
        "Visitor monitoring is disabled because Supabase is not configured."
      )

      return
    }


    let channel = null
    let mounted = true


    /*
     * Create visitor presence.
     */

    const setupPresence = async () => {

      try {

        /*
         * =========================================
         * STABLE VISITOR ID
         * =========================================
         *
         * Keep the same visitor ID when the page
         * is refreshed.
         *
         * This prevents the old connection and the
         * new connection from being counted as two
         * different visitors during a refresh.
         *
         * sessionStorage is used so a new browser tab
         * still receives its own visitor ID.
         */

        let visitorId =
          typeof window !== "undefined"
            ? sessionStorage.getItem(
                "portfolio-visitor-id"
              )
            : null


        if (!visitorId) {

          visitorId =
            typeof crypto !== "undefined" &&
            typeof crypto.randomUUID === "function"
              ? crypto.randomUUID()
              : `${Date.now()}-${Math.random()
                  .toString(36)
                  .substring(2)}`


          if (
            typeof window !== "undefined"
          ) {

            sessionStorage.setItem(
              "portfolio-visitor-id",
              visitorId
            )

          }

        }


        /*
         * =========================================
         * CREATE REALTIME CHANNEL
         * =========================================
         */

        channel = supabase.channel(
          "portfolio-visitors",
          {
            config: {
              presence: {
                key: visitorId,
              },
            },
          }
        )


        /*
         * =========================================
         * UPDATE VISITORS
         * =========================================
         */

        const updateVisitors = () => {

          if (!mounted || !channel) {
            return
          }

          try {

            const presenceState =
              channel.presenceState()


            /*
             * Each presence key represents one
             * unique visitor.
             *
             * Even if Supabase temporarily has
             * multiple presence entries for the
             * same visitor key, they are counted
             * only once.
             */

            const visitorList =
              Object.entries(
                presenceState
              ).map(
                ([key, presenceData]) => ({
                  id: key,
                  ...(presenceData?.[0] || {}),
                })
              )


            if (!mounted) {
              return
            }


            setVisitors(
              visitorList
            )


            setOnlineVisitors(
              visitorList.length
            )

          } catch (error) {

            console.error(
              "Unable to read visitor presence:",
              error
            )

          }

        }


        /*
         * =========================================
         * PRESENCE EVENTS
         * =========================================
         */

        channel.on(
          "presence",
          {
            event: "sync",
          },
          updateVisitors
        )


        channel.on(
          "presence",
          {
            event: "join",
          },
          updateVisitors
        )


        channel.on(
          "presence",
          {
            event: "leave",
          },
          updateVisitors
        )


        /*
         * =========================================
         * SUBSCRIBE
         * =========================================
         */

        channel.subscribe(
          async (status) => {

            console.log(
              "Supabase presence status:",
              status
            )


            if (
              status === "SUBSCRIBED"
            ) {

              try {

                await channel.track({
                  online_at:
                    new Date().toISOString(),
                })


                updateVisitors()

              } catch (error) {

                console.error(
                  "Unable to track visitor:",
                  error
                )

              }

            }


            if (
              status === "CHANNEL_ERROR"
            ) {

              console.error(
                "Supabase presence channel error."
              )

            }


            if (
              status === "TIMED_OUT"
            ) {

              console.error(
                "Supabase presence connection timed out."
              )

            }

          }
        )

      } catch (error) {

        console.error(
          "Visitor presence initialization failed:",
          error
        )

      }

    }


    setupPresence()


    /*
     * =========================================
     * CLEANUP
     * =========================================
     */

    return () => {

      mounted = false


      if (channel) {

        try {

          channel.untrack()

        } catch (error) {

          console.warn(
            "Unable to untrack visitor:",
            error
          )

        }


        try {

          supabase.removeChannel(
            channel
          )

        } catch (error) {

          console.warn(
            "Unable to remove visitor channel:",
            error
          )

        }

      }

    }

  }, [])


  return {
    onlineVisitors,
    visitors,
  }
}

export default useVisitorPresence