import { Route, Routes } from "react-router-dom"
import { useQuery } from "react-query"
import { useAppDispatch } from "./hooks"
import { setData, setStatus } from "./redux/slices/cards"
import { Status } from "./types/types"
import { Header } from "./components/Header/Header"
import { paths } from "./paths"
import { Home } from "./pages/Home/Home"
import { Cart } from "./pages/Cart/Cart"

export function App(): React.JSX.Element {
  const dispatch = useAppDispatch()

  const {
    isLoading,
    isSuccess,
    isError,
    data: cards,
  } = useQuery(
    "cards",
    async () =>
      await fetch(`${process.env.REACT_APP_SERVER_API}`).then((res) =>
        res.json()
      ),
    {
      retry: false,
      staleTime: Infinity,
    }
  )

  if (isLoading) {
    dispatch(setStatus(Status.loading))
  }

  if (isError) {
    dispatch(setStatus(Status.error))
  }

  if (cards && isSuccess) {
    dispatch(setData(cards.items))
    dispatch(setStatus(Status.loaded))
  }

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path={paths.home} element={<Home />} />
          <Route path={paths.cart} element={<Cart />} />
        </Routes>
      </main>
    </>
  )
}
