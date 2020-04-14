import React from 'react';
import styles from './Panel.scss';
import { copyText, copyImageFromUrl } from '../utils/clipboard';
import { TypesName } from '../skate-apps/types';

type Props = {
  skatePanel: any[];
};

function copyContent(content: string) {
  copyText(content);
}

function ListOfGifs(data: any[]) {
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
          onClick={() => copyImageFromUrl(item.src)}
          className={`button ${styles.copyBtn}`}
        >
          Copy Image
        </button>
      </div>
    )
  );
  return <div className={styles.imgGallery}>{items}</div>;
}

function listOfImages(data: any[]) {
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
          onClick={() => copyImageFromUrl(item.src)}
          className={`button ${styles.copyBtn}`}
        >
          Copy Image
        </button>
      </div>
    )
  );
  return <div className={styles.imgGallery}>{items}</div>;
}

function text(data: string) {
  return (
    <div className={styles.textContainer}>
      <p>{data}</p>
      <button
        type="button"
        onClick={() => copyContent(data)}
        className={`button ${styles.copyBtn}`}
      >
        Copy Text
      </button>
    </div>
  );
}

function listOfLinks(data: any[]) {
  const links = data.map((link: any) => {
    return link;
  });
  return links;
}

function contentTypeMapper(data: any, type: string) {
  switch (type) {
    case TypesName.ListOfImages: {
      return listOfImages(data);
    }
    case TypesName.ListOfGifs: {
      return ListOfGifs(data);
    }
    case TypesName.ListOfLinks: {
      return listOfLinks(data);
    }
    case TypesName.Text:
      return text(data);
    default:
      return null;
  }
}

export default function Panel(props: Props) {
  const { skatePanel } = props;

  const content = contentTypeMapper(skatePanel.data, skatePanel.type);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="column is-6">
      <div className={styles.content}>{content}</div>
    </div>
  );
}
