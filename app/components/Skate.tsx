import React from 'react';
import styles from './Skate.scss';

type Props = {
  onSkateBoardTextUpdate: () => void;
  initState: () => void;
  onKeyDown: () => void;

  skateBoardText: string;
  searchResult: [string];
  selectedResult: string;
};

export default function Skate(props: Props) {
  const {
    onSkateBoardTextUpdate,
    initState,
    onKeyDown,
    skateBoardText,
    searchResult,
    selectedResult
  } = props;

  initState();

  function botClass(botName: string) {
    if (botName === selectedResult) return 'option title is-6';
    return 'option';
  }

  const allSearchResult = searchResult.map(result => (
    <div key={result} className={botClass(result)}>
      {result}
    </div>
  ));

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div>
      <div className="container is-clipped">
        <div className={`${styles.skate}`} data-tid="skate">
          <input
            onKeyDown={e => onKeyDown(e)}
            id="skateBoard"
            type="text"
            value={skateBoardText}
            className={`input ${styles.skateBoard}`}
            data-tid="skateBoard"
            onChange={e => onSkateBoardTextUpdate(e.target.value)}
          />
        </div>
        <div className="options">
          <div className="columns">
            <div className="column">{allSearchResult}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
