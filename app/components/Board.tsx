import React from 'react';
import styles from './Skate.scss';

type Props = {
  onSkateBoardTextUpdate: () => void;
  initState: () => void;
  onKeyDown: () => void;

  skateBoardText: string;
};

export default function Skate(props: Props) {
  const {
    onSkateBoardTextUpdate,
    initState,
    onKeyDown,
    skateBoardText
  } = props;

  initState();

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div>
      <div className="is-clipped">
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
      </div>
    </div>
  );
}
