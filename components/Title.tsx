import cx from 'classnames'

export default function Title(props: {
  className?: string
  children: React.ReactText
}) {
  return (
    <h1
      className={cx(props.className, 'text-3xl text-center font-serif pt-20')}
    >
      {props.children}
    </h1>
  )
}
