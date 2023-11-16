import { ICardItem } from "../../types/types"
import { motion } from "framer-motion"
import styles from "./Card.module.css"
import { toPrice } from "../../helpers/helpers"
import { useAppDispatch } from "../../hooks"
import { addCardInCart } from "../../redux/slices/cards"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { paths } from "../../paths"

export const Card = ({ ...card }: ICardItem): React.JSX.Element => {
  const dispatch = useAppDispatch()

  const handleClick = (name: string): void => {
    toast.success(`Товар «${name}» добавлен в корзину`, {
      duration: 2000,
      style: { textAlign: "center", borderRadius: 50 },
    })

    dispatch(addCardInCart(card.id))
  }

  const variants = {
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
      layout
      variants={variants}
      whileHover={{
        scale: 1.05,
        boxShadow: "6px 6px 17px 2px rgba(18, 25, 31, 0.2)",
      }}
      className={styles.card}
      tabIndex={0}
    >
      <h2 className={styles.title}>{card.name || ""}</h2>
      <img className={styles.image} src={card.image} alt={card.name} />
      <div className={styles.order}>
        <h3>{toPrice(card.price) || toPrice(0)}</h3>
        {card.isInCart ? (
          <Link className={styles.orderBtn} to={paths.cart}>
            Оформить заказ
          </Link>
        ) : (
          <button
            onClick={() => handleClick(card.name)}
            className={styles.orderBtn}
          >
            Добавить в корзину
          </button>
        )}
      </div>
    </motion.li>
  )
}
