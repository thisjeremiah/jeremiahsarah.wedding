import { FormEvent, useCallback, useState } from 'react'

const PASSWORD = 'kodama'

export default function Auth(props: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isError, setError] = useState(false)

  const onSubmit = useCallback((evt: FormEvent) => {
    const password = (evt.target as any)['password'].value as string
    if (password === PASSWORD) {
      setIsAuthenticated(true)
    } else {
      setError(true)
    }
    console.log(password)
    evt.preventDefault()
  }, [])

  return (
    <div>
      {isAuthenticated ? (
        props.children
      ) : (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="pointer-events-auto">
            <form onSubmit={onSubmit}>
              <label className="block my-2" htmlFor="password">
                Password
              </label>
              <input
                className="bg-yellow-100 text-berry-700 rounded-lg px-1.5"
                type="password"
                name="password"
              />
              <p className="text-sm my-2">
                {isError ? 'Password is incorrect' : '‎'}
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
