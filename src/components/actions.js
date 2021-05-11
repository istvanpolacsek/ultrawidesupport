import React from 'react';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';

const actions = [
  { name: 'Zoom In', icon: <ZoomInIcon />, command: 'zoom-in' },
  { name: 'Reset', icon: <YoutubeSearchedForIcon />, command: 'reset' },
  { name: 'Zoom Out', icon: <ZoomOutIcon />, command: 'zoom-out' },
]

export default actions;