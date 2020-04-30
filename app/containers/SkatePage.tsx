import React from 'react';
import SkateOptions from '../components/Options/OptionsContainer';
import SkatePanel from '../components/Panel/PanelContainer';
import SkateBoard from '../components/Board/BoardContainer';
import InfoPage from '../components/Info/InfoContainer';

export default function Skate() {
  return (
    <div className="container is-fullhd is-clipped">
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
