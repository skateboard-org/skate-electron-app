/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import { ResponseTypes, TextItemType } from '../../../bots/types';
import CopyBtn from './CopyBtn';
import styles from '../Panel.scss';

type Props = {
  data: TextItemType[];
};

export default function ListOfTextView(props: Props) {
  const { data } = props;
  console.log(data);
  const texts = data.map((item, index) => {
    return (
      <div key={index} className={`box ${styles.textContainer}`}>
        <div className="columns">
          <div className="column">
            <div className="is-pulled-left">
              <span className="is-size-4ß has-text-weight-light">
                {item.text}
              </span>
            </div>
          </div>
          <div className="column">
            <div className="is-pulled-right">
              <div className="buttons has-addons">
                <CopyBtn data={item.text} dataType={ResponseTypes.ListOfText} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <div className={`${styles.textsContainer}`}>{texts}</div>;
}
