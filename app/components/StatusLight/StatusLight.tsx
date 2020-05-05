import React from 'react';
import { AnimateKeyframes } from 'react-simple-animate';
import {
  CommandStatusType,
  processCommandStatus
} from '../../reducers/commandStatus';

type Props = {
  isLoading: boolean;
  commandStatus: CommandStatusType;
  allBotsNames: string[];
};

export default function Loader(props: Props) {
  const { isLoading, commandStatus, allBotsNames } = props;

  const loaderGenerator = (shouldLoaderBeShown: boolean) => {
    return (
      <div
        className={shouldLoaderBeShown ? 'spinner-container' : 'is-invisible'}
      >
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
      const { colour, message } = processCommandStatus(status);

      const tooltipClass = 'has-tooltip-left has-tooltip-active';
      return (
        <div
          data-tooltip={message}
          className={`status-light-container ${tooltipClass}`}
        >
          <div className={`status-light ${colour}`} />
        </div>
      );
    }
    return null;
  };

  const shouldLoaderBeShown = () => {
    return allBotsNames.length === 0 || isLoading;
  };

  const shouldStatusLightBeShow = () => {
    return !shouldLoaderBeShown();
  };

  return (
    <div className="icon-container">
      {statusLight(shouldStatusLightBeShow(), commandStatus)}
      {loaderGenerator(shouldLoaderBeShown())}
    </div>
  );
}
