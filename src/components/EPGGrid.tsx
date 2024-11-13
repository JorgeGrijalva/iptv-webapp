import { FC } from 'react';
import { Box, Typography } from '@mui/joy';
import { LiveStream } from '../services/XtremeCodesAPI.types';

interface EPGGridProps {
  selectedChannel?: LiveStream;
  height: string | number;
}

export const EPGGrid: FC<EPGGridProps> = ({ selectedChannel, height }) => {
  // Aquí puedes integrar un servicio EPG gratuito como xmltv
  // Por ejemplo: https://github.com/XMLTV/xmltv

  return (
    <Box
      sx={{
        height,
        overflow: 'auto',
        borderRadius: 'lg',
        bgcolor: 'background.surface',
        p: 2,
      }}
    >
      <Typography level="h4">Guía de Programación</Typography>
      {/* Implementa aquí la lógica del EPG */}
    </Box>
  );
}; 