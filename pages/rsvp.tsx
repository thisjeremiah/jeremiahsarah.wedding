import type { NextPage } from 'next'
import { useState } from 'react'
import Layout from '../components/Layout'

const Rehearsal: NextPage = () => {
  const [submitted, setSubmitted] = useState(false)
  const [confirmed, setConfirmed] = useState(true)

  const toggleConfirmed = () => {
    setConfirmed((v) => !v)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const data = { name: event.target.name.value }

    const endpoint = '/api/submit?form=rehearsal'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    const response = await fetch(endpoint, options)

    const result = await response.json()

    setSubmitted(true)

    return result
  }

  return (
    <Layout
      title="Rehearsal Dinner"
      className="bg-slate-300 text-cobalt-500 cursor-cobalt selection:bg-white"
      navClassName="bg-slate-200"
      navBackdropClassName="bg-slate-400/50"
    >
      <div className="text-center w-full py-16 sm:py-0">
        <div className="sm:py-14 sm:min-h-[calc(100vh-15rem)] flex flex-col justify-center items-center">
          {submitted ? (
            <div className="font-serif text-2xl py-2">Thank You!</div>
          ) : (
            <>
              <span className="lowercase text-base sm:text-lg">
                <p>la paloma, santa barbara</p>
                <p>may 19 2023</p>
              </span>
              <form
                onSubmit={handleSubmit}
                className="text-left flex flex-col w-80"
              >
                <label htmlFor="name" className="lowercase block text-sm my-1">
                  Name(s):
                </label>
                <textarea
                  required
                  className="border-gray-300 bg-slate-100 focus:ring-cobalt-500 rounded px-1 selection:bg-slate-200"
                  name="Name"
                />
                <div className="relative flex items-center mt-3 mb-2">
                  <div className="flex h-5 items-center">
                    <input
                      aria-describedby="yes-description"
                      name="yes"
                      type="checkbox"
                      checked={confirmed}
                      className="h-4 w-4 text-cobalt-500 rounded border-gray-300 focus:ring-cobalt-500"
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
                      className="h-4 w-4 text-cobalt-500 rounded border-gray-300 focus:ring-cobalt-500"
                      onChange={toggleConfirmed}
                    />
                  </div>
                  <label htmlFor="no" className="ml-2 text-sm lowercase">
                    {`No, I won't be able to make it`}
                  </label>
                </div>
                <button
                  type="submit"
                  className="self-end lowercase rounded-full text-slate-100 px-3 py-1 text-sm mt-3 bg-cobalt-500 w-fit select-none mt-3"
                >
                  Submit
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Rehearsal
