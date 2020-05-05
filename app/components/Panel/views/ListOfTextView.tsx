/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import { copyAndExit } from '../../../utils/clipboard';
import { ResponseTypes, TextItemType } from '../../../bots/types';
import styles from '../Panel.scss';

type Props = {
  data: TextItemType[];
};

export default function Text(props: Props) {
  const { data } = props;
  const texts = data.map((item, idx) => {
    return (
      // eslint-disable-next-line react/no-array-index-key
      <div key={idx}>
        <p>{item.text}</p>
        <div className="has-text-right">
          <button
            type="button"
            onClick={() => copyAndExit(item.text, ResponseTypes.ListOfText)}
            className={`button ${styles.copyBtn} `}
          >
            Copy Text
          </button>
        </div>
      </div>
    );
  });
  console.log(texts);
  return <div className={`box ${styles.textContainer}`}>{texts}</div>;
}
