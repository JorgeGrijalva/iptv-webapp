import { FC, useRef } from "react"
import {
  Category,
  SeriesStream,
  VodStream,
} from "../services/XtremeCodesAPI.types"
import { useVirtualizer } from "@tanstack/react-virtual"
import { MediaCarousel } from "./MediaCarousel"
import { Typography } from "@mui/joy"

export interface MediaVirtualizedListProps {
  categories: Category[]
  streams: (SeriesStream | VodStream)[]
  onStreamClick: (stream: SeriesStream | VodStream) => void
}

export const MediaVirtualizedList: FC<MediaVirtualizedListProps> = (props) => {
  const parentRef = useRef<HTMLDivElement>(null)
  const { categories, streams, onStreamClick } = props

  const rowVirtualizer = useVirtualizer({
    count: categories.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 360,
    overscan: 2,
    paddingEnd: 40,
  })

  return (
    <div
      ref={parentRef}
      style={{
        height: "100%",
        overflow: "auto",
        margin: "0 -16px",
        padding: "16px 0",
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const category = categories[virtualItem.index]
          return (
            <div
              key={virtualItem.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: `${virtualItem.size}px`,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
                padding: "12px 16px",
              }}
            >
              <Typography
                level="title-lg"
                sx={{
                  background: "linear-gradient(45deg, #00f2fe 30%, #4facfe 90%)",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  fontWeight: 700,
                  fontSize: {
                    xs: "1.25rem",
                    sm: "1.5rem",
                  },
                  mb: { xs: 2, sm: 3 },
                  textAlign: "center",
                  letterSpacing: "0.5px",
                }}
              >
                {category.category_name}
              </Typography>
              <MediaCarousel
                items={streams.filter(
                  (stream) => stream.category_id === category.category_id
                )}
                onStreamClick={onStreamClick}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
