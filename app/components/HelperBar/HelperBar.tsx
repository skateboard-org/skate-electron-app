/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';

import {
  CommandStatusType,
  processCommandStatus,
  botStatusMessages
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

  if (commandStatus.botStatus === botStatusMessages.Undefined) {
    return null;
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
    <div className="bottom-section">
      <nav className="navbar">
        <div className="navbar-menu" id="navMenu">
          <div className="navbar-start">
            <div className="navbar-item update-text-container">
              <a
                className={`button is-text has-text-grey is-size-7 update-text ${updateButtonClass}`}
                onClick={() => update()}
              >
                {updateButtonText}
              </a>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item suggestion-text-container">
              <div className="has-text-grey is-size-7 suggestion-text">
                {suggestion}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
