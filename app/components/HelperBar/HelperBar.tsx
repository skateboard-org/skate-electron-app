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
import { ResponseTypes } from '../../bots/types';

type Props = {
  commandStatus: CommandStatusType;
  isInitialising: isInitialisingType;
  allBotsNames: string[];
  botResponseType: string;
  skatePanel: any[];
  loadBots: () => void;
};

export default function HelperBar(props: Props) {
  const {
    commandStatus,
    loadBots,
    isInitialising,
    allBotsNames,
    botResponseType,
    skatePanel
  } = props;

  if (
    allBotsNames.length === 0 &&
    !isInitialising.status &&
    !isInitialising.didInitialisingFail
  ) {
    loadBots();
  }

  if (commandStatus.botStatus === botStatusMessages.Undefined) {
    return null;
  }

  const update = () => {
    loadBots();
  };

  const updateTextGenerator = () => {
    const timeElasped = () => Math.abs(new Date() - lastUpdateTime);
    const lastUpdateTime = new Date(isInitialising.lastUpdateTime);
    const timeLimit = 1000 * 1;
    const hasRecentlyUpdated = timeElasped() < timeLimit;

    const updateButtonClass = () => {
      if (isInitialising.status) {
        return 'button is-text is-loading';
      }
      if (hasRecentlyUpdated) {
        return '';
      }
      return 'button is-text';
    };

    const updateButtonText = hasRecentlyUpdated
      ? 'recently updated 💚'
      : 'check for update ⬇️';

    return { updateButtonClass: updateButtonClass(), updateButtonText };
  };

  const { updateButtonClass, updateButtonText } = updateTextGenerator();

  const responseTypeSuggestion = (responseType: string) => {
    switch (responseType) {
      case ResponseTypes.Command:
        return null;
      case ResponseTypes.ListOfGifs:
        return 'click gif to copy link to clipboard';
      case ResponseTypes.ListOfImages:
        return 'click image to copy to clipboard';
      case ResponseTypes.ListOfLinks:
        return null;
      case ResponseTypes.ListOfText:
        return null;
      default:
    }
  };

  const relevantSuggestion = () => {
    if (
      skatePanel &&
      skatePanel.length > 0 &&
      botResponseType &&
      botResponseType.length > 0
    ) {
      const responseSuggestion = responseTypeSuggestion(botResponseType);
      return responseSuggestion;
    }
    const { suggestion } = processCommandStatus(commandStatus);
    return suggestion;
  };

  return (
    <div className="bottom-section">
      <nav className="navbar navbar-class is-fixed-bottom">
        <div className="navbar-menu" id="navMenu">
          <div className="navbar-start">
            <div className="navbar-item update-text-container">
              <a
                className={`${updateButtonClass} has-text-grey is-size-7 update-text`}
                onClick={() => update()}
              >
                {updateButtonText}
              </a>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item suggestion-text-container">
              <div className="has-text-grey is-size-7 suggestion-text">
                {relevantSuggestion()}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
