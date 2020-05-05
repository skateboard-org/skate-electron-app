/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';

type Props = {
  searchResult: [string];
  selectedResult: string;
};

export default function Options(props: Props) {
  const { searchResult, selectedResult } = props;

  const botClass = (botName: string) => {
    if (botName === selectedResult)
      return 'has-background-black-bis has-text-white-bis';
    return '';
  };

  const shortcut = (botName: string) => {
    if (botName === selectedResult) {
      return `↩`;
    }
    return '';
    // return `⌘ + ${index + 1}`;
  };

  if (searchResult && searchResult.length > 0) {
    const allSearchResult = searchResult.map((result, index) => (
      <div key={result} className={`option-container ${botClass(result)}`}>
        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <div className="option">{result}</div>
            </div>
          </div>
          <div>
            <div className="level-right">
              <div className="level-item">
                <div className="option-tip">{shortcut(result, index)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div className="column is-equal">
        <div className="container is-fullhd">
          <div className="columns">
            <div className="column">{allSearchResult}</div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
