import { motion } from 'framer-motion'

export function Transition(props: {
  transitionKey: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      key={props.transitionKey}
      initial="initial"
      animate="animate"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }}
    >
      {props.children}
    </motion.div>
  )
}
