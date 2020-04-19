import React from 'react';
import styles from './Panel.scss';
import { TypesName } from '../skate-apps/types';
import ListOfLinksView from './views/ListOfLinksView';
import ListOfImagesView from './views/ListOfImagesView';
import ListOfGifsView from './views/ListOfGifsView';
import TextView from './views/TextView';

type Props = {
  skatePanel: any[];
  botResponseType: string;
  reset: () => void;
};

// function copyAndCleanExit(
//   content: string,
//   contentType: string,
//   reset: () => void
// ) {
//   copyAndExit(content, contentType)
//     .then(() => reset())
//     .catch(() => console.log('Couldnt copy and exit'));
// }

function contentTypeMapper(data: any, type: string) {
  switch (type) {
    case TypesName.ListOfImages: {
      return <ListOfImagesView data={data} />;
    }
    case TypesName.ListOfGifs: {
      return <ListOfGifsView data={data} />;
    }
    case TypesName.ListOfLinks: {
      return <ListOfLinksView data={data} />;
    }
    case TypesName.Text:
      return <TextView data={data} />;
    default:
      return null;
  }
}

export default function Panel(props: Props) {
  const { skatePanel, botResponseType, reset } = props;
  if (botResponseType && botResponseType !== '') {
    if (skatePanel) {
      const content = contentTypeMapper(skatePanel, botResponseType);

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
