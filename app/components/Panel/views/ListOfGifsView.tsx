/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import Gallery from 'react-photo-gallery';
import { copyAndExit } from '../../../utils/clipboard';
import { ResponseTypes, GifItemType } from '../../../bots/types';

type Props = {
  data: [GifItemType];
};

const gifClickHandler = (event, { index, photo }) => {
  copyAndExit(photo.src || '', ResponseTypes.ListOfGifs);
};

export default function ListOfGifs(props: Props) {
  const { data } = props;
  const items = data.map((item: GifItemType) => {
    return {
      src: item.src,
      width: item.width,
      height: item.height
    };
  });
  return (
    <Gallery
      photos={items}
      columns={3}
      direction="column"
      onClick={gifClickHandler}
    />
  );
}
