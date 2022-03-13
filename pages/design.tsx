import type { NextPage } from 'next'

const colors = {
  sky: ['bg-sky-300', 'bg-sky-500', 'bg-sky-800'],
  lemon: ['bg-lemon-300', 'bg-lemon-500', 'bg-lemon-600'],
  rose: ['bg-rose-400', 'bg-rose-500', 'bg-rose-600'],
  berry: ['bg-berry-300', 'bg-berry-500', 'bg-berry-600'],
  fog: ['bg-fog-400', 'bg-fog-500', 'bg-fog-600'],
}

const Design: NextPage = () => {
  return (
    <div className="flex gap-10 p-12">
      {Object.entries(colors).map(([label, classNames]) => (
        <div
          className="text-center w-20 flex flex-col gap-4 items-center"
          key={label}
        >
          <div className="relative h-10 w-full flex">
            {classNames.map((className, index) => (
              <div
                key={className}
                style={{
                  left: `${index * 30}px`,
                }}
                className={`w-10 h-10 rotate-45 absolute ${className}`}
              />
            ))}
          </div>
          <p className="text-gray-600">{label}</p>
        </div>
      ))}
    </div>
  )
}

export default Design
