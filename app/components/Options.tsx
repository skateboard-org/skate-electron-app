import React from 'react';

type Props = {
  searchResult: [string];
  selectedResult: string;
};

export default function Options(props: Props) {
  const { searchResult, selectedResult } = props;

  function botClass(botName: string) {
    if (botName === selectedResult)
      return 'has-background-black-bis has-text-white-bis';
    return '';
  }

  const allSearchResult = searchResult.map(result => (
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
              <div className="option-tip">Press Enter</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="column is-6 options-padding">
      <div className="container is-clipped">
        <div className="columns">
          <div className="column">{allSearchResult}</div>
        </div>
      </div>
    </div>
  );
}
