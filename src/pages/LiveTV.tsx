import { FC, useCallback, useEffect, useRef, useState } from "react"
import { useAppSelector } from "../store/hooks"
import { selectLiveCategories, selectLiveStreams } from "../store/app/selector"
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Typography,
  Button,
  Stack,
} from "@mui/joy"
import { Category, LiveStream } from "../services/XtremeCodesAPI.types"
//import { KeyboardArrowRight, Glass, Gradient } from "@mui/icons-material"
import { containerToMimeType } from "../services/utils"
import videojs from "video.js"
import Player from "video.js/dist/types/player"
import { VideoPlayer } from "../components/VideoPlayer"
import { ChannelCard } from "../components/ChannelCard"
import { useSearchParams } from "react-router-dom"
import { useChannelUrl } from "../components/useMediaUrl"
import { useTheme } from '@mui/joy/styles';
import { useMediaQuery } from '@mui/material';
import { EPGGrid } from '../components/EPGGrid';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const SideMenuItem = styled(ListItemButton)(({ theme }) => ({
  padding: '12px 16px',
  borderRadius: '12px',
  marginBottom: '8px',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  
  '& img': {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
  },
  
  '&:hover': {
    background: 'rgba(255,255,255,0.1)',
  },
  
  '&.Mui-selected': {
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(10px)',
    
    '&:hover': {
      background: 'rgba(255,255,255,0.2)',
    }
  }
}));

const CategoryTab = styled(ListItemButton)(({ theme }) => ({
  padding: '12px 16px',
  borderRadius: '10px',
  color: 'white',
  opacity: 0.7,
  transition: 'all 0.2s ease',
  
  '&:hover': {
    opacity: 1,
    background: 'rgba(255,255,255,0.1)',
  },
  
  '&.active': {
    opacity: 1,
    background: 'rgba(255,255,255,0.15)',
    borderLeft: '4px solid #fff',
  }
}));

export const LiveTV: FC = () => {
  const liveStreams = useAppSelector(selectLiveStreams)
  const liveStreamCategories = useAppSelector(selectLiveCategories)
  const [selectedStream, setSelectedStream] = useState<LiveStream | undefined>(
    undefined,
  )
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined)
  const [searchParams, setSearchParams] = useSearchParams()
  const playerRef = useRef<Player | null>(null)
  const url = useChannelUrl(selectedStream?.stream_id ?? 0, "m3u8")
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  console.log(liveStreams)
  console.log(selectedStream)

  const channelId = searchParams.get("channel")

  useEffect(() => {
    const firstCategory = liveStreamCategories.find(
      (item) => item.category_id !== undefined,
    )

    if (channelId) {
      const stream = liveStreams.find(
        (stream) => stream.stream_id === Number(channelId),
      )
      if (stream) {
        setSelectedStream(stream)
        const category = liveStreamCategories.find(
          (category) => category.category_id === stream.category_id,
        )
        if (category) setSelectedCategory(category)
        else setSelectedCategory(firstCategory)
      }
      return
    }

    setSelectedCategory(firstCategory)

    setSelectedStream(
      liveStreams
        .filter((stream) => stream.category_id === firstCategory?.category_id)
        .find((item) => item !== undefined),
    )
  }, [channelId, liveStreamCategories, liveStreams])

  const onStreamClick = (stream: LiveStream) => {
    if (stream.stream_id === undefined) return

    setSearchParams((prev) => {
      prev.set("channel", stream.stream_id!.toString())
      return prev
    })
  }

  const categoryLiveStreams = useCallback(() => {
    return liveStreams.filter(
      (stream) => stream.category_id === selectedCategory?.category_id,
    )
  }, [liveStreams, selectedCategory])

  const videoJsOptions = useCallback(() => {
    return {
      autoplay: true,
      preload: "true",
      controls: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src: url,
          type: containerToMimeType("m3u8"),
        },
      ],
    }
  }, [url])

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player

    player.on("error", (e: any) => {
      console.log(e)
    })

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting")
    })

    player.on("dispose", () => {
      videojs.log("player will dispose")
    })
  }

  const getCategoriasUnicas = useCallback(() => {
    return liveStreamCategories.reduce((acc: string[], cat) => {
      if (cat.category_name && !acc.includes(cat.category_name)) {
        acc.push(cat.category_name);
      }
      return acc;
    }, []);
  }, [liveStreamCategories]);

  const handleCategoryChange = (categoryName: string) => {
    const category = liveStreamCategories.find(
      cat => cat.category_name === categoryName
    );
    setSelectedCategory(category);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        p: { xs: 1, md: 2 },
      }}
    >
      <Grid container spacing={2}>
        {/* Panel Lateral - Ahora va primero en desktop */}
        <Grid xs={12} md={3} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              height: '100%',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Título de Categorías */}
            <Typography 
              level="h4" 
              sx={{ 
                color: 'white', 
                mb: 2, 
                px: 2,
                display: { xs: 'none', md: 'block' } 
              }}
            >
              Categorías
            </Typography>

            {/* Categorías - Vertical en desktop, Horizontal en móvil */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                gap: 1,
                overflowX: { xs: 'auto', md: 'hidden' },
                overflowY: { xs: 'hidden', md: 'auto' },
                mb: 2,
                maxHeight: { xs: '60px', md: '30vh' },
                '&::-webkit-scrollbar': {
                  width: '4px',
                  height: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '4px',
                },
              }}
            >
              {getCategoriasUnicas().map((categoryName) => (
                <CategoryTab
                  key={categoryName}
                  onClick={() => handleCategoryChange(categoryName)}
                  className={selectedCategory?.category_name === categoryName ? 'active' : ''}
                  sx={{
                    minWidth: { xs: 'max-content', md: '100%' },
                    whiteSpace: 'nowrap',
                    borderLeft: { 
                      xs: 'none', 
                      md: selectedCategory?.category_name === categoryName 
                        ? '4px solid #fff' 
                        : '4px solid transparent' 
                    },
                  }}
                >
                  <Typography 
                    level="body-lg"
                    sx={{ 
                      color: 'white',
                      opacity: selectedCategory?.category_name === categoryName ? 1 : 0.7
                    }}
                  >
                    {categoryName}
                  </Typography>
                </CategoryTab>
              ))}
            </Box>

            {/* Separador */}
            <Box 
              sx={{ 
                height: '1px', 
                background: 'rgba(255,255,255,0.1)', 
                my: 2,
                display: { xs: 'none', md: 'block' }
              }} 
            />

            {/* Lista de canales */}
            <List
              sx={{
                flex: 1,
                overflow: 'auto',
                '&::-webkit-scrollbar': { width: '4px' },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '4px',
                },
              }}
            >
              {categoryLiveStreams().map((stream) => (
                <SideMenuItem
                  key={stream.stream_id}
                  selected={selectedStream?.stream_id === stream.stream_id}
                  onClick={() => onStreamClick(stream)}
                >
                  <img 
                    src={stream.stream_icon} 
                    alt={stream.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/default-channel-icon.png';
                    }}
                  />
                  <Typography 
                    level="body-md" 
                    sx={{ 
                      color: 'white',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {stream.name}
                  </Typography>
                </SideMenuItem>
              ))}
            </List>
          </Box>
        </Grid>

        {/* Panel Principal - Ahora va después */}
        <Grid xs={12} md={9}>
          {/* Reproductor */}
          <Box
            sx={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              height: { xs: '35vh', md: '65vh' },
            }}
          >
            <VideoPlayer options={videoJsOptions()} onReady={handlePlayerReady} />
            
            {/* Info del programa actual */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                p: 3,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
              }}
            >
              <Typography level="h3" sx={{ color: 'white', mb: 1 }}>
                {selectedStream?.name}
              </Typography>
              <Typography level="body-md" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Programa actual
              </Typography>
            </Box>
          </Box>

          {/* EPG Grid mejorada */}
          <Box
            sx={{
              mt: 2,
              p: 2,
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Typography level="h4" sx={{ color: 'white', mb: 2 }}>
              Guía de Programación
            </Typography>
            <EPGGrid selectedChannel={selectedStream} height="25vh" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
