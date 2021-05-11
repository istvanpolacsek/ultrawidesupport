import React from 'react';
import Grid from '@material-ui/core/Grid';
import Theme from './theme';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import { fetchStatusData} from './statusfetch';

const status = fetchStatusData();
const StatusSwitch = React.lazy(() => import('./statusswitch'));

chrome.action.setBadgeBackgroundColor({ color: green[400] });

const Popup = () => {
  return (
    <Theme>
      <Grid container direction="row" justify="space-between" alignItems="center" style={{ margin: 10, width: 200, height: 50 }}>
        <React.Suspense fallback={<CircularProgress />}>
          <StatusSwitch status={status} />
        </React.Suspense>
      </Grid>
    </Theme>
  );
}

export default React.memo(Popup);