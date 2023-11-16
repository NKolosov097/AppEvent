import { toPrice } from "../../helpers/helpers"
import { motion } from "framer-motion"
import { ICardItem } from "../../types/types"
import styles from "./CartItem.module.css"
import { useAppDispatch } from "../../hooks"
import { removeCardFromCart } from "../../redux/slices/cards"

export const CartItem = ({ ...card }: ICardItem): React.JSX.Element => {
  const dispatch = useAppDispatch()

  const variantsOfLi = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  }

  return (
    <motion.li
      variants={variantsOfLi}
      layout
      className={styles.cardItem}
      tabIndex={1}
    >
      <h2 className={styles.name}>{card.name}</h2>
      <h3 className={styles.price}>{toPrice(card.price)}</h3>
      <button
        onClick={() => dispatch(removeCardFromCart(card.id))}
        className={styles.deleteBtn}
      >
        Убрать
      </button>
    </motion.li>
  )
}
