import React, {useEffect} from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props, value ) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ maxWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value ,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function ProgressBar(
  {progress, 
    setProgress, 
    totalTime,
     pauseCounter, 
     resetCounter, 
     startCounter, 
    }) {
      
  useEffect(() => {
    if(progress > 0 && !pauseCounter){
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 1));
    }, totalTime *10);
    return () => {
      clearInterval(timer);
    };
  }
  if(resetCounter){
    setProgress(0);

  }
  }, [progress, pauseCounter, resetCounter, startCounter]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
      
    </Box>
  );
}
