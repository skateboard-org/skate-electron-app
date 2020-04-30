import React from 'react';
import {
  botStatusMessages,
  paramStatusMessages
} from '../../../reducers/commandStatus';

type Props = {
  isLoaderVisible: boolean;
  commandStatus: {
    botStatus: botStatusMessages;
    paramStatus: paramStatusMessages;
  };
};

export default function Loader(props: Props) {
  const { isLoaderVisible, commandStatus } = props;

  const spinnerClassFn = (toBeShown: boolean) => {
    if (toBeShown) {
      return '';
    }
    return 'is-invisible';
  };

  const status = () => {
    if (
      commandStatus.botStatus === botStatusMessages.Undefined &&
      commandStatus.paramStatus === paramStatusMessages.Undefined
    ) {
      return '😌';
    }
    if (
      commandStatus.botStatus === botStatusMessages.Valid &&
      commandStatus.paramStatus === paramStatusMessages.Valid
    ) {
      return '💚';
    }
    return '💀';
  };

  const statusSymbol = (isVisible: boolean) => {
    if (isVisible) return <span className="status-symbol">{status()}</span>;
    return null;
  };

  return (
    <div className="icon-container">
      {statusSymbol(!isLoaderVisible)}
      <div className={spinnerClassFn(isLoaderVisible)}>
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
    </div>
  );
}
