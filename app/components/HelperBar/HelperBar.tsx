/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';

import {
  CommandStatusType,
  processCommandStatus
} from '../../reducers/commandStatus';

type Props = {
  commandStatus: CommandStatusType;
  loadBots: () => void;
};

export default function HelperBar(props: Props) {
  const { commandStatus, loadBots } = props;
  const { suggestion } = processCommandStatus(commandStatus);
  loadBots();
  if (suggestion) {
    return (
      <div className="column">
        <div className="has-text-grey is-pulled-right is-size-7 helper-bar-text">
          {suggestion}
        </div>
      </div>
    );
  }
  return null;
}
