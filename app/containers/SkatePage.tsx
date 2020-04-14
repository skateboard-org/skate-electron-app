import React from 'react';
import SkateOptions from './SkateOptions';
import SkatePanel from './SkatePanel';
import SkateBoard from './SkateBoard';

export default function Skate() {
  return (
    <div>
      <div className="columns>">
        <div className="column is-12 is-paddingless">
          <SkateBoard />
        </div>
        <div className="column is-6 is-mobile">
          <div className="columns">
            <div className="column is-12">
              <SkateOptions />
            </div>
            <div className="column is-12">
              <SkatePanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
