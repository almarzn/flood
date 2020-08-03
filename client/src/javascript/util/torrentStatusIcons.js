import React from 'react';
import torrentStatusMap from '@shared/constants/torrentStatusMap';

import ErrorIcon from '../components/icons/ErrorIcon';
import SpinnerIcon from '../components/icons/SpinnerIcon';
import StartIcon from '../components/icons/StartIcon';
import StopIcon from '../components/icons/StopIcon';

const STATUS_ICON_MAP = {
  error: <ErrorIcon />,
  hashChecking: <SpinnerIcon />,
  stopped: <StopIcon />,
  running: <StartIcon />,
};

export function torrentStatusIcons(status) {
  let statusString;
  const statusConditions = {
    hashChecking: [status.includes(torrentStatusMap.checking)],
    error: [status.includes(torrentStatusMap.error)],
    stopped: [status.includes(torrentStatusMap.stopped)],
    running: [status.includes(torrentStatusMap.downloading), status.includes(torrentStatusMap.seeding)],
  };

  Object.keys(statusConditions).some((conditionName) => {
    const conditions = statusConditions[conditionName];

    conditions.some((condition) => {
      if (condition) {
        statusString = conditionName;
      }

      return condition;
    });

    return statusString != null;
  });

  return STATUS_ICON_MAP[statusString];
}
