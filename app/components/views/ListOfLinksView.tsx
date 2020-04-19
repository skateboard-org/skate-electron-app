/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import styles from '../Panel.scss';
import { copyAndExit } from '../../utils/clipboard';
import { TypesName, LinkItemType } from '../../skate-apps/types';
import { openLinkInDefaultBrowser } from '../../utils/ipc';

type Props = {
  data: [LinkItemType];
};

export default function ListOfLinks(props: Props) {
  const { data } = props;
  const links = data.map((linkItem: LinkItemType, index: number) => {
    return (
      <div key={index} className={`column box ${styles.linkContainer}`}>
        <div className="level is-mobile">
          <div className="level-left">
            <div>
              <h3 className="is-size-3 has-text-weight-light">
                {linkItem.title}
              </h3>
              <span className="is-size-6 has-text-weight-light has-text-grey">
                {linkItem.link}
              </span>
            </div>
          </div>
          <div className="level-right">
            <div className="buttons has-addons">
              <button
                type="button"
                onClick={() => copyAndExit(linkItem.link, TypesName.Text)}
                className={`button ${styles.copyBtn} `}
              >
                Copy Link
              </button>
              <button
                type="button"
                onClick={e => openLinkInDefaultBrowser(e, linkItem.link)}
                className={`button ${styles.copyBtn} `}
              >
                Open Link
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <div className={`${styles.linksContainer}`}>{links}</div>;
}
