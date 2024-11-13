import { Card, CardContent, CardCover, Link, Typography, Box } from "@mui/joy"
import { FC } from "react"
import { isVod } from "../services/utils"
import { SeriesStream, VodStream } from "../services/XtremeCodesAPI.types"

export interface MediaCardProps {
  stream: VodStream | SeriesStream
  onStreamClick: (stream: VodStream | SeriesStream) => void
  isMobile: boolean
}

export const MediaCard: FC<MediaCardProps> = (props) => {
  const { stream, onStreamClick, isMobile } = props

  return (
    <Card
      onClick={() => onStreamClick(stream)}
      sx={{
        width: "100%",
        aspectRatio: "2/3",
        background: "rgba(17, 25, 40, 0.75)",
        backdropFilter: "blur(4px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        minWidth: { xs: "100px", sm: "130px", md: "150px" },
        maxWidth: { xs: "140px", sm: "160px", md: "180px" },
        margin: "0 auto",
        cursor: "pointer",
        "&:hover": {
          transform: isMobile ? "scale(1.02)" : "scale(1.05)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          "& .info-overlay": {
            transform: "translateY(0)",
            opacity: 1,
          }
        },
      }}
    >
      <CardCover>
        <img
          src={isVod(stream) ? stream.stream_icon : stream.cover}
          loading="lazy"
          alt=""
          style={{ 
            objectFit: "cover",
            width: "100%",
            height: "100%"
          }}
        />
      </CardCover>
      <Box
        className="info-overlay"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)",
          padding: { xs: 1, sm: 1.5 },
          transform: "translateY(100%)",
          opacity: 0,
          transition: "all 0.3s ease",
        }}
      >
        <Typography 
          level="title-md"
          textColor="#fff"
          sx={{
            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.2,
            mb: 0.5
          }}
        >
          {stream.name}
        </Typography>
        <Typography 
          level="body-sm" 
          sx={{
            color: "rgba(255,255,255,0.7)",
            fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" }
          }}
        >
          {stream.rating}/10
        </Typography>
      </Box>
    </Card>
  )
}
