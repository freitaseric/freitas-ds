import * as React from "react"

import type { ToastTone } from "../components/toast"

export type ToastInput = {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  tone?: ToastTone
  duration?: number
}

export type ToastRecord = ToastInput & {
  id: string
  open: boolean
}

export type ToastHandle = {
  id: string
  dismiss: () => void
}

type ToastContextValue = {
  toasts: ToastRecord[]
  toast: (toast: ToastInput) => ToastHandle
  dismiss: (id: string) => void
}

export const ToastContext = React.createContext<ToastContextValue | null>(null)

export function useToast() {
  const context = React.useContext(ToastContext)

  if (!context) {
    throw new Error("useToast deve ser usado dentro de <Toaster>.")
  }

  return context
}
