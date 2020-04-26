import React from 'react';
import styles from './Panel.scss';
import { ResponseTypes } from '../bots/types';
import ListOfLinksView from './views/ListOfLinksView';
import ListOfImagesView from './views/ListOfImagesView';
import ListOfGifsView from './views/ListOfGifsView';
import TextView from './views/TextView';
import Loader from './helper/loader';

type Props = {
  skatePanel: any[];
  botResponseType: string;
  isLoading: 'running' | 'idle';
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

function contentTypeMapper(data: any, responseType: string) {
  switch (responseType) {
    case ResponseTypes.ListOfImages: {
      return <ListOfImagesView data={data} />;
    }
    case ResponseTypes.ListOfGifs: {
      return <ListOfGifsView data={data} />;
    }
    case ResponseTypes.ListOfLinks: {
      return <ListOfLinksView data={data} />;
    }
    case ResponseTypes.Text:
      return <TextView data={data} />;
    default:
      return null;
  }
}

export default function Panel(props: Props) {
  const { botResponseType, skatePanel } = props;
  if (botResponseType && botResponseType !== '') {
    if (skatePanel) {
      const content = contentTypeMapper(skatePanel, botResponseType);

      return (
        <div className="column is-equal">
          <div className={styles.content}>{content}</div>
        </div>
      );
    }
  }
  return null;
}
