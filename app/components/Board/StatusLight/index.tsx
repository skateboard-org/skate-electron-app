import React from 'react';
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

  const onMouseEnterStatusLight = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: string | null
  ) => {
    console.log('hello', message);
  };

  const onMouseOutStatusLight = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: string | null
  ) => {
    console.log('hello', message);
  };

  const statusLight = (isVisible: boolean, status: CommandStatusType) => {
    if (isVisible) {
      const { colour, message, animate } = processCommandStatus(status);

      const animationClass = animate ? 'animation-wiggle' : '';

      const tooltipClass = 'has-tooltip-left has-tooltip-active';

      return (
        // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
        <div
          onMouseEnter={e => onMouseEnterStatusLight(e, message)}
          onMouseOut={e => onMouseOutStatusLight(e, message)}
          data-tooltip={message}
          className={`status-light ${colour} ${tooltipClass} ${animationClass}`}
        />
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
