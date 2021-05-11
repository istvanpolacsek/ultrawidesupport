const queryOptions = { active: true, currentWindow: true };
const statusCommand = { command: 'overlay-status' };

export const fetchStatusData = () => {
  let statusData = fetchStatus();
  return {
    status: wrapPromise(statusData)
  }
}

const wrapPromise = (promise) => {
  let status = 'pending';
  let result;
  let suspender = promise.then(
    r => {
      status = 'success';
      result = r;
    },
    e => {
      status = 'error';
      result = e;
    }
  );
  return {
    get() {
      switch (status) {
        case 'pending':
          throw suspender;
        case 'error':
          throw result;
        case 'success':
          return result;
      }
    }
  }
}

const fetchStatus = () => {
  return new Promise(resolve => {
    chrome.tabs.query(queryOptions, tabs => {
      if (tabs[0].url.includes('http')) {
        chrome.tabs.sendMessage(tabs[0].id, statusCommand, response => {
          resolve(response);
        })
      } else {
        resolve(false);
      };
    })
  });
}