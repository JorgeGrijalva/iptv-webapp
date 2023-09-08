import { Card, CardContent, CardCover, Link, Typography } from "@mui/joy"
import { FC } from "react"
import { LiveStream } from "../services/XtremeCodesAPI.types"

export interface ChannelCardProps {
  stream: LiveStream
  onStreamClick: (stream: LiveStream) => void
}

export const ChannelCard: FC<ChannelCardProps> = (props) => {
  const { stream, onStreamClick } = props

  return (
    <Card
      sx={{
        margin: 1,
        flexGrow: 1,
        //height: "100%",
        "&:hover": {
          boxShadow: "md",
          outline: "#fff solid 2px",
          backgroundColor:
            "var(--joy-palette-neutral-outlinedHoverBg, var(--joy-palette-neutral-100, #EAEEF6))",
        },
      }}
    >
      <CardCover>
        <img src={stream.stream_icon} loading="lazy" alt="" />
      </CardCover>
      <CardCover
        sx={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0) 300px)",
        }}
      />
      <CardContent sx={{ justifyContent: "flex-end" }}>
        <Typography level="body-sm" textColor="#fff" noWrap>
          <Link
            overlay
            underline="none"
            textColor="inherit"
            textOverflow="ellipsis"
            onClick={() => onStreamClick(stream)}
          >
            {stream.name}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  )
}
