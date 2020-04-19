/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import Gallery from 'react-photo-gallery';
import { copyAndExit } from '../../utils/clipboard';
import { TypesName, ImageItemType } from '../../skate-apps/types';
import styles from '../Panel.scss';

type Props = {
  data: [ImageItemType];
};

const imageClickHandler = (event, { index, photo }) => {
  copyAndExit(photo.src || '', TypesName.ListOfImages);
};

export default function ListOfImages(props: Props) {
  const { data } = props;
  const items = data.map((item: ImageItemType) => ({
    src: item.src,
    width: item.width,
    height: item.height
  }));
  return (
    <Gallery
      photos={items}
      columns={3}
      direction="column"
      onClick={imageClickHandler}
    />
  );
}
