import { FC, ReactNode } from "react"

interface DisplayIfProps {
  children: ReactNode
  expr: boolean
  onElse?: JSX.Element
}

export const DisplayIf: FC<DisplayIfProps> = (props) => {
  if (props.expr) {
    return <>{props.children}</>
  }
  if (props.onElse) {
    return props.onElse
  }
  return null
}
