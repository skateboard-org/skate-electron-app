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
      return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className="column is-equal info-padding">
          <div className="container is-fullhd is-clipped">
            <div className="columns">
              <div className="column">{bot.title}</div>
              <div className="column">{bot.desc}</div>
              <div className="column">{`${bot.name} ${bot.inputParameter}`}</div>
              <div className="column">{bot.parameterDesc}</div>
            </div>
          </div>
        </div>
      );
    }
  }
  return null;
}
