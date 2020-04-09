import React from 'react';
import styles from './Panel.scss';

type Props = {
  skatePanel: any[];
};

export default function Skate(props: Props) {
  const { skatePanel } = props;

  const columns = skatePanel.map((item, idx) => (
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
      <div className={styles.imgGallery}>{columns}</div>
    </div>
  );
}
