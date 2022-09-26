import { Theme, toast, ToastPosition } from "react-toastify"
import { useThemeContext } from "../../Provider/ThemeProvider"
import { enumTypeTheme } from "../../theme/theme"


const config = (theme : enumTypeTheme) => {
  return {
    theme : theme,
    position : "bottom-center" as ToastPosition,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }
}

export const toastSuccess = (message: string, theme : enumTypeTheme) => {
  toast.success(message, config(theme))
}

export const toastError = (message: string, theme : enumTypeTheme) => {
  toast.error(message, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme
  })
  return false
}

export const toastPromise = (promiseFunction : Promise<any>,  theme : enumTypeTheme, errorMessage : string = "", showIfErrorOnly : boolean = true) => {
  return toast.promise(
    promiseFunction,
    {
      pending: {
        ...config(theme),
        render(){
          return "processing"
        }
      },
      success: {
        ...config(theme),
        render(data){
          return "success"
        }
      },
      error: {
        ...config(theme),
        render(data){
          return errorMessage == "" ? `${data.data}` : errorMessage
        }
      },
    },
  )
}


export const toastPromiseErrorOnly = (promiseFunction : Promise<any>,  theme : enumTypeTheme) => {
  return toast.promise(
    promiseFunction,
    {
      error: {
        ...config(theme),
        render(data){
          return `${data.data}`
        }
      },
    },
  )
}