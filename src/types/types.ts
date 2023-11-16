export const enum Status {
  loading = "loading",
  loaded = "loaded",
  error = "error",
}

export interface ICardItem {
  id: number
  image: string
  name: string
  price: number
  isInCart?: boolean
}

export interface ICardsSlicer {
  cards: Array<ICardItem>
  cart: Array<ICardItem>
  status: Status
}
