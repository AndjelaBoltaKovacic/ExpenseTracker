import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Box, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

interface CarouselProps {
  content1: React.ReactNode;
  content2: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ content1, content2 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
  };

  const handleSlidePrev = () => {
    handleSlideChange(activeIndex - 1);
  };

  const handleSlideNext = () => {
    handleSlideChange(activeIndex + 1);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" width="100%" position="relative">
      <SwipeableViews
        index={activeIndex}
        onChangeIndex={handleSlideChange}
        containerStyle={{ height: '100%', alignItems: 'center' }}
      >
        {content1}
        {content2}
      </SwipeableViews>

      <IconButton
        style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
        disabled={activeIndex === 0}
        onClick={handleSlidePrev}
      >
        <ArrowBack />
      </IconButton>
      <IconButton
        style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
        disabled={activeIndex === 1}
        onClick={handleSlideNext}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
};

export default Carousel;
