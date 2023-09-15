import { toast } from "react-hot-toast";

let toastId

export const toastStart = (message) => {
    toastId = toast.loading(message)
}

export const toastEnd = () => {
    toast.dismiss(toastId)
}