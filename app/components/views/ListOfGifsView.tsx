/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import Gallery from 'react-photo-gallery';
import { copyAndExit } from '../../utils/clipboard';
import { TypesName } from '../../skate-apps/types';
import styles from '../Panel.scss';

type Props = {
  data: [any];
};

const gifClickHandler = (event, { index, photo }) => {
  copyAndExit(photo.src || '', TypesName.ListOfGifs);
};

export default function ListOfGifs(props: Props) {
  const { data } = props;
  const items = data.map(
    (item: {
      src: string;
      width: number;
      height: number;
      placeholder: string;
      preview_src: string;
    }) => {
      return {
        src: item.preview_src,
        width: item.width,
        height: item.height,
        orignal: item.src
      };
    }
  );
  return (
    <Gallery
      photos={items}
      columns={3}
      direction="column"
      onClick={gifClickHandler}
    />
  );
}
