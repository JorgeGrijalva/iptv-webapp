import { Card, CardContent, CardCover, Link, Typography } from "@mui/joy"
import { FC } from "react"
import { isVod } from "../services/utils"
import { SeriesStream, VodStream } from "../services/XtremeCodesAPI.types"

export interface MediaCardProps {
  stream: VodStream | SeriesStream
  onStreamClick: (stream: VodStream | SeriesStream) => void
}

export const MediaCard: FC<MediaCardProps> = (props) => {
  const { stream, onStreamClick } = props

  return (
    <Card
      sx={{
        margin: 1,
        flexGrow: 1,
        height: "100%",
        "&:hover": {
          boxShadow: "md",
          outline: "#fff solid 2px",
          backgroundColor:
            "var(--joy-palette-neutral-outlinedHoverBg, var(--joy-palette-neutral-100, #EAEEF6))",
        },
      }}
    >
      <CardCover>
        <img
          src={isVod(stream) ? stream.stream_icon : stream.cover}
          loading="lazy"
          alt=""
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)",
        }}
      />
      <CardContent sx={{ justifyContent: "flex-end", height: 40 }}>
        <div style={{ display: "grid", gridTemplateRows: "30px 10px" }}>
          <Typography level="title-lg" textColor="#fff" noWrap>
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
          <Typography level="body-sm" textColor="neutral.300">
            {stream.rating}/10
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}
