import React from 'react';
import { AnimateKeyframes } from 'react-simple-animate';
import {
  CommandStatusType,
  processCommandStatus
} from '../../../reducers/commandStatus';

type Props = {
  isLoaderVisible: boolean;
  commandStatus: CommandStatusType;
};

export default function Loader(props: Props) {
  const loaderGenerator = (shouldLoaderBeShown: boolean) => {
    return (
      <div className={shouldLoaderBeShown ? '' : 'is-invisible'}>
        <div className="spinner">
          <div className="spinner-blade" />
          <div className="spinner-blade" />
          <div className="spinner-blade" />
          <div className="spinner-blade" />
          <div className="spinner-blade" />
          <div className="spinner-blade" />
          <div className="spinner-blade" />
          <div className="spinner-blade" />
          <div className="spinner-blade" />
          <div className="spinner-blade" />
          <div className="spinner-blade" />
          <div className="spinner-blade" />
        </div>
      </div>
    );
  };

  const statusLight = (isVisible: boolean, status: CommandStatusType) => {
    if (isVisible) {
      const { colour, message, animate } = processCommandStatus(status);

      console.log(colour, animate);

      const tooltipClass = 'has-tooltip-left has-tooltip-active';
      return (
        <div
          data-tooltip={message}
          className={`status-light-container ${tooltipClass}`}
        >
          <AnimateKeyframes
            play={animate} // Toggle when animation should start
            duration={0.5}
            keyframes={[
              'animation: rubberband cubic-bezier(.36,.07,.19,.97) both',
              'backface-visibility: hidden',
              { 0: 'transform: scale3d(1, 1, 1)' },
              { 30: 'transform: scale3d(1.25, 0.75, 1)' },
              { 40: 'transform: scale3d(0.75, 1.25, 1)' },
              { 50: 'transform: scale3d(1.15, 0.85, 1)' },
              { 65: 'transform: scale3d(0.95, 1.05, 1)' },
              { 75: 'transform: scale3d(1.05, 0.95, 1)' },
              { 100: 'transform: scale3d(1, 1, 1)' }
            ]}
          >
            <div className={`status-light ${colour}`} />
          </AnimateKeyframes>
        </div>
      );
    }
    return null;
  };

  const { isLoaderVisible, commandStatus } = props;

  return (
    <div className="icon-container">
      {statusLight(!isLoaderVisible, commandStatus)}
      {loaderGenerator(isLoaderVisible)}
    </div>
  );
}
