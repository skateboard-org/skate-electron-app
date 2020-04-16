import React from 'react';
import ProgressiveImage from 'react-progressive-image';
import Gallery from 'react-photo-gallery';
import styles from './Panel.scss';
import { copyAndExit } from '../utils/clipboard';
import { TypesName } from '../skate-apps/types';

type Props = {
  skatePanel: any[];
  botResponseType: string;
  reset: () => void;
};

function copyAndCleanExit(
  content: string,
  contentType: string,
  reset: () => void
) {
  copyAndExit(content, contentType)
    .then(() => reset())
    .catch(() => console.log('Couldnt copy and exit'));
}

const gifClickHandler = (event, { index, photo }) => {
  copyAndExit(photo.src || '', TypesName.ListOfGifs);
};

const imageClickHandler = (event, { index, photo }) => {
  copyAndExit(photo.src || '', TypesName.ListOfImages);
};

function listOfGifs(data: any[], reset: () => void) {
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

function listOfImages(data: any[], reset: () => void) {
  const items = data.map(
    (item: { src: string; width: number; height: number }) => ({
      src: item.src,
      width: item.width,
      height: item.height
    })
  );
  return (
    <Gallery
      photos={items}
      columns={3}
      direction="column"
      onClick={imageClickHandler}
    />
  );
}

function text(data: string, reset: () => void) {
  return (
    <div className={styles.textContainer}>
      <p>{data}</p>
      <button
        type="button"
        onClick={() => copyAndCleanExit(data, TypesName.Text, reset)}
        className={`button ${styles.copyBtn}`}
      >
        Copy Text
      </button>
    </div>
  );
}

function listOfLinks(data: any[]) {
  const links = data.map((link: string) => {
    return link;
  });
  return links;
}

function contentTypeMapper(data: any, type: string, reset: () => void) {
  switch (type) {
    case TypesName.ListOfImages: {
      return listOfImages(data, reset);
    }
    case TypesName.ListOfGifs: {
      return listOfGifs(data, reset);
    }
    case TypesName.ListOfLinks: {
      return listOfLinks(data);
    }
    case TypesName.Text:
      return text(data, reset);
    default:
      return null;
  }
}

export default function Panel(props: Props) {
  const { skatePanel, botResponseType, reset } = props;
  if (botResponseType && botResponseType !== '') {
    if (skatePanel) {
      const content = contentTypeMapper(skatePanel, botResponseType, reset);

      return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className="column is-equal">
          <div className={styles.content}>{content}</div>
        </div>
      );
    }
  }
  return null;
}
