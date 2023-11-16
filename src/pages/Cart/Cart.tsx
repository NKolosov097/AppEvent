import { useState, useEffect } from "react"
import { toPrice } from "../../helpers/helpers"
import { useAppSelector } from "../../hooks"
import { motion } from "framer-motion"
import styles from "./Cart.module.css"
import { CartItem } from "../../components/CartItem/CartItem"

export const Cart = (): React.JSX.Element => {
  const { cart } = useAppSelector((state) => state.cards)
  const [isOpened, setIsOpened] = useState<boolean>(false)
  const sumOfCart = cart.reduce((acc, val) => (acc += val.price), 0)

  useEffect(() => {
    setIsOpened(true)

    return () => {
      setIsOpened(false)
    }
  }, [])

  const variantsOfUl = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  }

  return (
    <>
      <motion.ul
        initial={false}
        animate={isOpened ? "open" : "closed"}
        variants={variantsOfUl}
        className={styles.cartList}
      >
        {cart.length > 0 &&
          cart.map((card) => <CartItem key={card.id} {...card} />)}
      </motion.ul>

      <motion.h4 layout className={styles.sumOfCart}>
        {sumOfCart > 0 ? `Итого - ${toPrice(sumOfCart)}` : "Корзина пуста"}
      </motion.h4>
    </>
  )
}
