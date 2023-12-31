import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAppSelector } from "../../hooks"
import { Card } from "../../components/Card/Card"
import { Toaster } from "react-hot-toast"
import styles from "./Home.module.css"
import { Status } from "../../types/types"

export const Home = (): React.JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const { cards, status } = useAppSelector((state) => state.cards)

  useEffect(() => {
    if (status === Status.loaded) {
      setIsOpened(true)
    }
  }, [status])

  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  }

  return (
    <motion.ul
      initial={false}
      animate={isOpened ? "open" : "closed"}
      variants={variants}
      className={styles.list}
    >
      {cards.length > 0 &&
        cards.map((card) => <Card key={card.id} {...card} />)}
      <Toaster />
    </motion.ul>
  )
}
