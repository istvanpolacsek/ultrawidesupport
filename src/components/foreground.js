import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
import Slide from '@material-ui/core/Slide';
import { CgScreen, CgScreenWide } from 'react-icons/cg';
import Theme from './theme';

const Foreground = () => {
  const container = document.querySelector('.uws-foreground').parentElement;
  const video = document.querySelector('video');
  const maxValue = Math.round(screen.width / screen.height * 100) / 100;

  const [minValue, setMinValue] = React.useState(Math.round(video.videoWidth / video.videoHeight * 100) / 100);
  const [visible, setVisible] = React.useState(false);
  const [value, setValue] = React.useState(minValue);
  
  const handleChange = (event, value) => {
    if (minValue < value && value < maxValue) {
      setValue(value);
    }
  };

  React.useEffect(() => {
    video.style.width = null;
    video.style.height = null;
    video.style.left = null;
    video.style.top = null;
    const scale = Math.round(value / minValue * 100);
    video.parentElement.setAttribute('style', `height: ${scale}% !important; transform: translateY(-${50 * (scale - 100) / scale}%) !important;`);
  }, [value]);

  video.addEventListener('loadedmetadata', () => {
    setMinValue(Math.round(video.videoWidth / video.videoHeight * 100) / 100);
    setValue(Math.round(video.videoWidth / video.videoHeight * 100) / 100);
  });

  container.addEventListener('mousemove', () => {
    resetTimer();
    setVisible(true);
  });

  container.addEventListener('mouseleave', () => {
    setVisible(false)
  });

  document.addEventListener('fullscreenchange', () => {
    setValue(minValue);
  });

  let timer;

  const resetTimer = React.useCallback(() => {
    clearTimeout(timer);
    timer = setTimeout(() => { setVisible(false) }, 3000);
  }, []);

  const marks = [
    { value: 4 / 3, label: '4:3' },
    { value: 16 / 9, label: '16:9' },
    { value: 64 / 27, label: '21:9' },
    { value: 32 / 9, label: '32:9' },
  ]

  return (
    <Theme>
      <Grid
        container
        justify="flex-start"
        alignItems="center"
        style={{ position: 'absolute', height: '100%' }}
      >
        <Slide in={visible} direction="right">
          <Grid
            item
            style={{ zIndex: 2147483647 }}
          >
            <Box m={2}>
              <Paper onClick={e => e.stopPropagation()}>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Box m={1}>
                    <CgScreenWide fontSize={30} />
                  </Box>
                  <Box m={1}>
                    <Slider
                      value={value}
                      onChange={handleChange}
                      step={0.01}
                      min={1}
                      max={4}
                      orientation="vertical"
                      style={{ height: 200 }}
                      marks={marks}
                      valueLabelDisplay="off"
                    />
                  </Box>
                  <Box m={1}>
                    <CgScreen fontSize={22} />
                  </Box>
                </Grid>
              </Paper>
            </Box>
          </Grid>
        </Slide>
      </Grid>
    </Theme>
  )
}

export default React.memo(Foreground);