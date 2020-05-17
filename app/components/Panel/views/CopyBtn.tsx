/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import { copyAndExit } from '../../../utils/clipboard';
import { ResponseTypes } from '../../../bots/types';
import styles from '../Panel.scss';

type Props = {
  data: string;
  dataType: ResponseTypes;
};

export default function CopyBtn(props: Props) {
  const { data, dataType } = props;
  let label = 'Copy';
  if (dataType === ResponseTypes.ListOfLinks) {
    label = 'Copy Link';
  }
  if (dataType === ResponseTypes.ListOfText) {
    label = 'Copy Text';
  }
  return (
    <button
      type="button"
      onClick={() => copyAndExit(data, dataType)}
      className={`button is-small ${styles.copyBtn} `}
    >
      {label}
    </button>
  );
}
