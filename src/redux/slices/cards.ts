import { createSlice } from "@reduxjs/toolkit"
import { ICardsSlicer, Status } from "../../types/types"

const initialState: ICardsSlicer = {
  cards: [],
  cart: [],
  status: Status.loading,
}

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setData: (state, action) => {
      const newData = state.cards.map((item) => {
        const arr = state.cards.filter((card) => card.id !== item.id)

        return arr
      })

      if (state.cards.length === 0) {
        state.cards = [...action.payload, ...newData]
      } else {
        // state.cards = [...action.payload]
      }

      return state
    },
    setStatus: (state, action) => {
      state.status = action.payload
      return state
    },
    addCardInCart: (state, action) => {
      if (state.cards) {
        state.cards.map((card) => {
          if (card.id === action.payload) {
            card.isInCart = true
            state.cart = [...state.cart, card]
          }

          return card
        })
      }

      return state
    },
    removeCardFromCart: (state, action) => {
      state.cart = state.cart.filter((card) => card.id !== action.payload)

      state.cards.map((card) => {
        if (card.id === action.payload) {
          card.isInCart = undefined
        }

        return card
      })

      return state
    },
  },
})

export const cardsReducer = cardsSlice.reducer
export const { setData, setStatus, addCardInCart, removeCardFromCart } =
  cardsSlice.actions
