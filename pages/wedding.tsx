import type { NextPage } from 'next'
import Link from 'next/link'
import { useState } from 'react'
import Layout from '../components/Layout'
import { theme } from '../tailwind.config.js'

async function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms))
}

const Wedding: NextPage = () => {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [confirmed, setConfirmed] = useState(true)

  const toggleConfirmed = () => {
    setConfirmed((v) => !v)
  }

  const handleSubmit = async (event: any) => {
    setSubmitting(true)

    event.preventDefault()

    const data = {
      name: event.target.name.value,
      coming: confirmed,
    }

    const endpoint = '/api/submit?form=wedding'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    const response = await fetch(endpoint, options)

    const result = await response.json()

    await sleep(1500)

    setSubmitted(true)

    return result
  }

  return (
    <Layout
      title="Wedding RSVP"
      className="bg-cobalt-500 text-white cursor-cobalt selection:bg-lemon-700"
      navClassName="bg-cobalt-600"
      navBackdropClassName="bg-cobalt-400/50"
      buttonClassName="bg-white text-cobalt-500"
      themeColor={theme.extend.colors.cobalt[500]}
    >
      <div className="text-center w-full py-16 sm:py-0">
        <div className="sm:py-14 min-h-[calc(100vh-19rem)] sm:min-h-[calc(100vh-15rem)] flex flex-col justify-center items-center">
          {submitted ? (
            <div>
              <div className="font-serif text-lemon-400 text-3xl py-2 mb-8">
                Thanks for letting us know!
              </div>
              <Link href="/">
                <a>
                  <div>Visit the home page ↗</div>
                </a>
              </Link>
            </div>
          ) : (
            <>
              <span className="lowercase text-base sm:text-lg">
                <p>Villa & Vine, Santa Barbara</p>
                <p>May 20 2023</p>
                <p className="max-w-[calc(100vw-3rem)] w-[30rem] text-base py-6 text-white"></p>
              </span>
              <form
                onSubmit={handleSubmit}
                className="text-left flex flex-col w-full sm:w-80 px-10 sm:px-0"
              >
                <label htmlFor="name" className="lowercase block text-sm my-1">
                  Name(s):
                </label>
                <textarea
                  spellCheck="false"
                  required
                  className="border-gray-300 text-cobalt-500 bg-lemon-100 focus:ring-lemon-700 rounded px-2 selection:bg-lemon-400 focus:border-lemon-700"
                  name="name"
                />
                <div className="relative flex items-center mt-3 mb-2">
                  <div className="flex h-5 items-center">
                    <input
                      aria-describedby="yes-description"
                      name="yes"
                      type="checkbox"
                      checked={confirmed}
                      className="h-4 w-4 text-lemon-700 rounded border-gray-300 focus:ring-lemon-700"
                      onChange={toggleConfirmed}
                    />
                  </div>
                  <label htmlFor="yes" className="ml-2 text-sm lowercase">
                    Yes, I will be there
                  </label>
                </div>
                <div className="relative flex items-center">
                  <div className="flex h-5 items-center">
                    <input
                      aria-describedby="no-description"
                      name="no"
                      type="checkbox"
                      checked={!confirmed}
                      className="h-4 w-4 text-lemon-700 rounded border-gray-300 focus:ring-lemon-700"
                      onChange={toggleConfirmed}
                    />
                  </div>
                  <label htmlFor="no" className="ml-2 text-sm lowercase">
                    {`No, I won't be able to make it`}
                  </label>
                </div>
                <button
                  type="submit"
                  className="self-center flex items-center mt-3 gap-2 lowercase rounded-full text-slate-100 px-6 py-1 text-base bg-lemon-700 w-fit select-none"
                >
                  {submitting ? 'Submitting' : 'Submit'}
                  {submitting ? (
                    <svg
                      className="animate-spin h-4 w-4 -mr-1"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="currentColor"
                        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
                      />
                    </svg>
                  ) : null}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Wedding
