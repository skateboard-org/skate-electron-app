import React from 'react';
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

function ListOfGifs(data: any[], reset: () => void) {
  const items = data.map(
    (
      item: {
        src: string | undefined;
        width: string | number | undefined;
        height: string | number | undefined;
      },
      idx: string | number | undefined
    ) => (
      <div key={idx} className={styles.imgContainer}>
        <img
          alt="gif"
          src={item.src}
          className={styles.imgElement}
          width={item.width}
          height={item.height}
        />
        <button
          type="button"
          onClick={() =>
            copyAndCleanExit(item.src || '', TypesName.ListOfGifs, reset)
          }
          className={`button ${styles.copyBtn}`}
        >
          Copy Image
        </button>
      </div>
    )
  );
  return <div className={styles.imgGallery}>{items}</div>;
}

function listOfImages(data: any[], reset: () => void) {
  const items = data.map(
    (
      item: {
        src: string | undefined;
        width: string | number | undefined;
        height: string | number | undefined;
      },
      idx: string | number | undefined
    ) => (
      <div key={idx} className={styles.imgContainer}>
        <img
          alt="gif"
          src={item.src}
          className={styles.imgElement}
          width={item.width}
          height={item.height}
        />
        <button
          type="button"
          onClick={() =>
            copyAndCleanExit(item.src || '', TypesName.ListOfImages, reset)
          }
          className={`button ${styles.copyBtn}`}
        >
          Copy Image
        </button>
      </div>
    )
  );
  return <div className={styles.imgGallery}>{items}</div>;
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
      return ListOfGifs(data, reset);
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
