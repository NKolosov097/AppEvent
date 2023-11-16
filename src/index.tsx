import React from "react"
import { HashRouter } from "react-router-dom"
import { createRoot } from "react-dom/client"
import "./index.css"
import { App } from "./App"
import { QueryClient, QueryClientProvider } from "react-query"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import store from "./redux/store"

const queryClient = new QueryClient()

const container = document.getElementById("root")!
const root = createRoot(container)
let persitor = persistStore(store)

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persitor}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </HashRouter>
  </React.StrictMode>
)
