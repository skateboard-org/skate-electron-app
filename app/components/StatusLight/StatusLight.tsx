import React from 'react';
import { AnimateKeyframes } from 'react-simple-animate';
import {
  CommandStatusType,
  processCommandStatus
} from '../../reducers/commandStatus';
import { isInitialisingType } from '../../reducers/isInitialising';
import { isLoadingType } from '../../reducers/isLoading';

type Props = {
  isLoading: isLoadingType;
  isInitialising: isInitialisingType;
  commandStatus: CommandStatusType;
};

export default function Loader(props: Props) {
  const { isLoading, commandStatus, isInitialising } = props;

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
      let colour: string;
      let message: string | null;
      if (isInitialising.didInitialisingFail === true) {
        colour = 'error';
        message = 'Initialisation Failed!';
      } else if (isLoading.didExecutionFail === true) {
        colour = 'error';
        message = 'Request Timed Out!';
      } else {
        const statusLightProperties = processCommandStatus(status);
        colour = statusLightProperties.colour;
        message = statusLightProperties.message;
      }

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
    return isInitialising.status || isLoading.status;
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
