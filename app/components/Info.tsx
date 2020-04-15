import React from 'react';
import { BotType } from '../reducers/allBotsDictionary';

type Props = {
  allBotsDictionary: Map<string, BotType>;
  selectedResult: string;
  searchingFor: string;
};

const botPropertiesKeys = [
  'name',
  'title',
  'icon',
  'desc',
  'returnType',
  'inputParameter',
  'parameterDesc'
];

export default function Options(props: Props) {
  const { allBotsDictionary, selectedResult, searchingFor } = props;

  if (searchingFor === 'bot' && allBotsDictionary) {
    const bot = allBotsDictionary.get(selectedResult);
    if (bot !== undefined) {
      const botProperties = botPropertiesKeys.map(key => (
        <div key={key} className="option-container">
          <div className="level is-mobile">
            <div className="level-left">
              <div className="level-item">
                <div className="option">{key}</div>
              </div>
            </div>
            <div>
              <div className="level-right">
                <div className="level-item">
                  <div className="option-tip">{bot[key]}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ));
      return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className="column is-equal info-padding">
          <div className="container is-fullhd is-clipped">
            <div className="columns">
              <div className="column">{botProperties}</div>
            </div>
          </div>
        </div>
      );
    }
  }
  return null;
}
