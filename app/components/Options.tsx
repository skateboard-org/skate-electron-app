/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';

type Props = {
  searchResult: [string];
  selectedResult: string;
  chooseResult: (selection?: 0 | string) => void;
};

export default function Options(props: Props) {
  const { searchResult, selectedResult, chooseResult } = props;

  function botClass(botName: string) {
    if (botName === selectedResult)
      return 'has-background-black-bis has-text-white-bis';
    return '';
  }

  function shortcut(botName: string) {
    if (botName === selectedResult) {
      return '↩';
    }
    return '';
  }

  if (searchResult && searchResult.length > 0) {
    const allSearchResult = searchResult.map(result => (
      <div
        key={result}
        className={`option-container ${botClass(result)}`}
        onClick={e => chooseResult(result)}
      >
        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <div className="option">{result}</div>
            </div>
          </div>
          <div>
            <div className="level-right">
              <div className="level-item">
                <div className="option-tip">{shortcut(result)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div className="column is-equal options-padding">
        <div className="container is-fullhd is-clipped">
          <div className="columns">
            <div className="column">{allSearchResult}</div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
