import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import { CgScreenWide } from 'react-icons/cg';

const queryOptions = { active: true, currentWindow: true };

const StatusSwitch = (props) => {
  const [status, setStatus] = React.useState(props.status.status.get());

  const handleToggle = (event, value) => {
    const command = { command: value ? 'overlay-enable' : 'overlay-disable' };
    chrome.tabs.query(queryOptions, tabs => {
      if (tabs[0].url.includes('http')) {
        chrome.tabs.sendMessage(tabs[0].id, command, response => {
          setStatus(response);
          chrome.action.setBadgeText({ text: response ? ' ' : '', tabId: tabs[0].id });
        });
      };
    });
  };

  return (
    <React.Fragment>
      <Box m={1}>
        <CgScreenWide size={20} />
      </Box>
      <Box m={1} style={{ flexGrow: 1 }}>
        <Typography variant="button">{status ? 'disable' : 'enable'}</Typography>
      </Box>
      <Switch
        color="primary"
        defaultChecked={status}
        checked={status}
        onChange={handleToggle}
        inputProps={{ 'aria-label': 'uws-overlay-toggle' }}
      />
    </React.Fragment>
  );
}

export default StatusSwitch;