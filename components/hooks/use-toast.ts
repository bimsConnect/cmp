import type { ToastActionElement, ToastProps } from "@/components/ui/Toast"
import { useToast as useToastPrimitive } from "@/components/ui/UseToast"

type ToastOptions = Omit<ToastProps, "id"> & {
  action?: ToastActionElement
}

export function useToast() {
  const { toast, dismiss, toasts } = useToastPrimitive()

  return {
    toast: (options: ToastOptions) => {
      return toast(options)
    },
    dismiss,
    toasts,
  }
}

