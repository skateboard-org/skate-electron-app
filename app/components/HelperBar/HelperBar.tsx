/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';

import {
  CommandStatusType,
  processCommandStatus
} from '../../reducers/commandStatus';
import { isInitialisingType } from '../../reducers/isInitialising';

type Props = {
  commandStatus: CommandStatusType;
  isInitialising: isInitialisingType;
  allBotsNames: string[];
  loadBots: () => void;
};

export default function HelperBar(props: Props) {
  const { commandStatus, loadBots, isInitialising, allBotsNames } = props;
  const { suggestion } = processCommandStatus(commandStatus);

  if (allBotsNames.length === 0 && !isInitialising.status) {
    loadBots();
  }

  const lastUpdateTime = new Date(isInitialising.lastUpdateTime);
  const timeElasped = () => Math.abs(new Date() - lastUpdateTime);
  const timeLimit = 1000 * 60;

  const hasRecentlyUpdated = timeElasped() < timeLimit;

  const update = () => {
    loadBots();
  };

  const updateButtonClass = isInitialising.status ? 'is-loading' : '';

  const updateButtonText = hasRecentlyUpdated
    ? 'recently updated 💚'
    : 'check for update ⬇️';

  return (
    <div className="column">
      <div className="level is-mobile">
        <div className="level-left">
          <div className="level-item">
            <button
              type="button"
              className={`button is-text has-text-grey is-pulled-left is-size-7 update-text ${updateButtonClass}`}
              onClick={() => update()}
            >
              {updateButtonText}
            </button>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item has-text-grey is-pulled-right is-size-7 helper-bar-text">
            {suggestion}
          </div>
        </div>
      </div>
    </div>
  );
}
