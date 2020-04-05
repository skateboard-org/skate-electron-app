import React from 'react';

type Props = {
  searchResult: [string];
  selectedResult: string;
};

export default function Skate(props: Props) {
  const { searchResult, selectedResult } = props;

  function botClass(botName: string) {
    if (botName === selectedResult) return 'is-danger is-light';
    return '';
  }

  const allSearchResult = searchResult.map(result => (
    <div
      key={result}
      className={`notification ${botClass(result)}`}
      style={{ marginBottom: `${0.5}rem` }}
    >
      <div className="content">
        <div className="title is-6">{result}</div>
      </div>
    </div>
  ));

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div>
      <div className="container is-clipped">
        <div className="columns">
          <div className="column">{allSearchResult}</div>
        </div>
      </div>
    </div>
  );
}
