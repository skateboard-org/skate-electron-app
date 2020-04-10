import React from 'react';
import styles from './Panel.scss';
import { copyText, copyImageFromUrl } from '../utils/clipboard';
import { TypesName } from '../skate-apps/types';

type Props = {
  skatePanel: any[];
};

function copyContent(content) {
  copyText(content);
}

function listOfImages(data) {
  const items = data.map((item, idx) => (
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
  ));
  return <div className={styles.imgGallery}>{items}</div>;
}

function text(data) {
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

function listOfLinks(data) {
  const links = data.map(link => {
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
      return listOfImages(data);
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

export default function Skate(props: Props) {
  const { skatePanel } = props;

  const content = contentTypeMapper(skatePanel.data, skatePanel.type);

  // let rows;

  // columns.forEach((element, idx) => {
  //   if ((idx + 1) % 3 === 0) {
  //     rows.push(
  //       <div key={`gif-row-${idx}`} className="columns">
  //         {element}
  //         {columns[idx - 1]}
  //         {columns[idx - 2]}
  //       </div>
  //     );
  //   } else if (columns.length % idx < 3) {
  //     rows.push(element);
  //   }
  // });

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div>
      <div className={styles.content}>{content}</div>
    </div>
  );
}
