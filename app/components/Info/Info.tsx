import React from 'react';
import { BotType } from '../../reducers/allBotsDictionary';

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
  'responseType',
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
        <div className="column is-equal">
          <div className="container is-fullhd has-text-centered info-padding">
            <div className="column is-12 botIconContainer">
              <span className="icon is-large fas fa-3x">
                <i className={`${bot.icon} botIcon`} />
              </span>
            </div>
            <div className="column is-12 ">
              <div className="is-size-4 has-text-grey-dark has-text-weight-light botName">
                {bot.name}
              </div>
            </div>
            <div className="column is-12 botTitleContainer">
              <div className="is-size-6 has-text-grey-dark has-text-weight-normal botTitle">
                {`${bot.title}`}
              </div>
            </div>
            <div className="column is-12 botDescContainer">
              <div className="is-size-6 has-text-grey has-text-weight-light botDesc">
                {`${bot.desc}`}
              </div>
            </div>

            {/* <div className="column">{` ${bot.inputParameter}`}</div> */}
            {/* <div className="column">{bot.parameterDesc}</div> */}
          </div>
        </div>
      );
    }
  }
  return null;
}
