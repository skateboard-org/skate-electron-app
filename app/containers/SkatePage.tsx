import React from 'react';
import Option from '../components/Options/OptionsContainer';
import Panel from '../components/Panel/PanelContainer';
import Board from '../components/Board/BoardContainer';
import Info from '../components/Info/InfoContainer';
import HelperBar from '../components/HelperBar/HelperBarContainer';

export default function Skate() {
  return (
    <div className="container is-fullhd is-clipped skate-page">
      <div className="columns is-mobile top-section">
        <Board />
      </div>
      <div className="columns is-mobile main-section">
        <Option />
        <Panel />
        <Info />
      </div>
      <HelperBar />
    </div>
  );
}
