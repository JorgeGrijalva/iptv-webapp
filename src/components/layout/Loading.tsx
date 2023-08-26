import { CircularProgress } from "@mui/joy"
import { FC } from "react"

export const Loading: FC = () => {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: "flex-grow",
        marginTop: 50,
      }}
    >
      <CircularProgress size="lg" />
    </main>
  )
}
