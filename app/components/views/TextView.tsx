/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import { copyAndExit } from '../../utils/clipboard';
import { TypesName } from '../../skate-apps/types';
import styles from '../Panel.scss';

type Props = {
  data: string;
};

export default function Text(props: Props) {
  const { data } = props;
  return (
    <div className={`box ${styles.textContainer}`}>
      <p>{data}</p>
      <div className="has-text-right">
        <button
          type="button"
          onClick={() => copyAndExit(data, TypesName.Text)}
          className={`button ${styles.copyBtn} `}
        >
          Copy Text
        </button>
      </div>
    </div>
  );
}
