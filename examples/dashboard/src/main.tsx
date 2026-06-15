import * as React from "react"

import { createRoot } from "react-dom/client"

import "./styles.css"

import { App } from "./app"

const rootElement = document.getElementById("root")

if (!rootElement) {
  throw new Error("Elemento root não encontrado.")
}

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
