import React from 'react';
import SkateOptions from './SkateOptions';
import SkatePanel from './SkatePanel';
import SkateBoard from './SkateBoard';
import InfoPage from './InfoPage';

export default function Skate() {
  return (
    <div className="container is-fullhd">
      <div className="columns is-mobile">
        <SkateBoard />
      </div>
      <div className="columns is-mobile">
        <SkateOptions />
        <SkatePanel />
        <InfoPage />
      </div>
    </div>
  );
}
