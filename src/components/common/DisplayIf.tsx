import React from "react"

interface DisplayIfProps {
  children: React.ReactNode
  expr: boolean
  onElse?: JSX.Element
}

export const DisplayIf: React.FC<DisplayIfProps> = (props) => {
  if (props.expr) {
    return <>{props.children}</>
  }
  if (props.onElse) {
    return props.onElse
  }
  return null
}
