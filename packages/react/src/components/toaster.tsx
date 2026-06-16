import * as React from "react"
import { ToastContext, type ToastInput, type ToastRecord } from "../hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from "./toast"

export type ToasterProps = {
  children?: React.ReactNode
  duration?: number
  swipeDirection?: React.ComponentProps<typeof ToastProvider>["swipeDirection"]
}

let toastCounter = 0

function createToastId() {
  toastCounter += 1
  return `toast-${toastCounter}`
}

export function Toaster({
  children,
  duration = 5000,
  swipeDirection = "right"
}: ToasterProps) {
  const [toasts, setToasts] = React.useState<ToastRecord[]>([])

  const dismiss = React.useCallback((id: string) => {
    setToasts((current) =>
      current.map((toast) => (toast.id === id ? { ...toast, open: false } : toast))
    )
  }, [])

  const remove = React.useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const toast = React.useCallback(
    (input: ToastInput) => {
      const id = createToastId()
      setToasts((current) => [...current, { ...input, id, open: true }])

      return {
        id,
        dismiss: () => dismiss(id)
      }
    },
    [dismiss]
  )

  const value = React.useMemo(
    () => ({
      toasts,
      toast,
      dismiss
    }),
    [toasts, toast, dismiss]
  )

  return (
    <ToastContext.Provider value={value}>
      <ToastProvider duration={duration} swipeDirection={swipeDirection}>
        {children}

        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            open={toast.open}
            tone={toast.tone}
            duration={toast.duration}
            onOpenChange={(open) => {
              if (!open) {
                dismiss(toast.id)
              }
            }}
            onAnimationEnd={() => {
              if (!toast.open) {
                remove(toast.id)
              }
            }}
          >
            {toast.title ? <ToastTitle>{toast.title}</ToastTitle> : null}
            {toast.description ? (
              <ToastDescription>{toast.description}</ToastDescription>
            ) : null}
            {toast.action}
            <ToastClose />
          </Toast>
        ))}

        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  )
}
