import { Link } from "react-router-dom"
import styles from "./Header.module.css"
import { paths } from "../../paths"
import { useAppSelector } from "../../hooks"
import { declOfNum } from "../../helpers/helpers"

export const Header = (): React.JSX.Element => {
  const countOfCards = useAppSelector((state) => state.cards.cart).length

  return (
    <header className={styles.header}>
      <Link to={paths.home}>каталог</Link>
      <Link to={paths.home}>AppEvent</Link>
      <Link to={paths.cart}>
        корзина - {countOfCards}{" "}
        {declOfNum(countOfCards, ["товар", "товара", "товаров"])}
      </Link>
    </header>
  )
}
