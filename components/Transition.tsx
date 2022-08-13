import { motion } from 'framer-motion'

export function Transition(props: { key: string; children: React.ReactNode }) {
  return (
    <motion.div
      key={props.key}
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
