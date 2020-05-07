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

  if (allBotsNames.length === 0 && !isInitialising.status) {
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
    const timeLimit = 1000 * 60;

    const updateButtonClass = isInitialising.status ? 'is-loading' : '';

    const updateButtonText =
      timeElasped() < timeLimit ? 'recently updated 💚' : 'check for update ⬇️';

    return { updateButtonClass, updateButtonText };
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
      if (responseSuggestion) {
        return responseSuggestion;
      }
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
                {relevantSuggestion()}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
