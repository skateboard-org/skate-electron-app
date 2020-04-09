import React from 'react';
import styles from './Panel.scss';

type Props = {
  skatePanel: any[];
};

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
    </div>
  ));
  return <div className={styles.imgGallery}>{items}</div>;
}

function text(data) {
  return <div className={styles.textContainer}>{data}</div>;
}

function contentTypeMapper(data: any, type: string) {
  switch (type) {
    case 'ListOfGifs': {
      return listOfImages(data);
    }
    case 'ListOfImages': {
      return listOfImages(data);
    }
    case 'Text':
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
