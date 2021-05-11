import React from 'react';
import { render } from 'react-dom';
import Foreground from './components/foreground';

const uwsClassName = 'uws-foreground';

chrome.runtime.onMessage.addListener(({ command }, sender, sendResponse) => {
  switch (command) {
    case 'overlay-enable':
      sendResponse(enableOverlay());
      break;
    case 'overlay-disable':
      sendResponse(disableOverlay());
      break;
    case 'overlay-status':
      sendResponse(!!document.querySelector(`.${uwsClassName}`));
      break;
    default:
      break;
  }
});

const enableOverlay = () => {
  let video;
  if (!!(video = document.querySelector('video'))) {
    createOverlay(video);
  }
  return !!video;
}

const disableOverlay = () => {
  document.querySelector(`.${uwsClassName}`).remove();
  return false;
}

const getVideoContainer = element => {
  return element.parentElement.childElementCount > 2 ? element.parentElement : getVideoContainer(element.parentElement);
}

const createOverlay = element => {
  const container = getVideoContainer(element);
  const foreground = document.createElement('div');
  
  foreground.className = uwsClassName;
  if (!document.querySelector(`.${uwsClassName}`)) {
    container.prepend(foreground);
    render(<Foreground />, foreground);
  };
}
