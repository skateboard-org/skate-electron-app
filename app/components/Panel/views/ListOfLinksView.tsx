/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import Truncate from 'react-truncate';
import styles from '../Panel.scss';
import { ResponseTypes, LinkItemType } from '../../../bots/types';
import { openLinkInDefaultBrowser } from '../../../utils/ipc';
import CopyBtn from './CopyBtn';

type Props = {
  data: [LinkItemType];
};

export default function ListOfLinks(props: Props) {
  const { data } = props;

  const dots = <span>...</span>;
  const truncatedText = (text, width) => (
    <Truncate width={width} ellipsis={dots}>
      {text}
    </Truncate>
  );

  const links = data.map((linkItem: LinkItemType, index: number) => {
    return (
      <div key={index} className={`box ${styles.linkContainer}`}>
        <div className="columns">
          <div className="column">
            <div className="is-pulled-left">
              <h3 className="is-size-3 has-text-weight-light">
                {truncatedText(linkItem.title, 370)}
              </h3>
              <span className="is-size-7 has-text-weight-light has-text-grey">
                {truncatedText(linkItem.link, 340)}
              </span>
            </div>
          </div>
          <div className="column">
            <div className="is-pulled-right">
              <div className="buttons has-addons">
                <CopyBtn
                  data={linkItem.link}
                  dataType={ResponseTypes.ListOfText}
                />
                <button
                  type="button"
                  onClick={e => openLinkInDefaultBrowser(e, linkItem.link)}
                  className={`button is-small ${styles.copyBtn} `}
                >
                  Open Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <div className={`${styles.linksContainer}`}>{links}</div>;
}
