import cx from 'classnames'

export default function Title(props: {
  className?: string
  children: React.ReactText
}) {
  return (
    <h1
      className={cx(
        props.className,
        'text-3xl sm:text-4xl text-center font-serif py-4',
      )}
    >
      {props.children}
    </h1>
  )
}
