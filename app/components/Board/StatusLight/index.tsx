import React from 'react';
import {
  botStatusMessages,
  paramStatusMessages,
  CommandStatusType
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

  const messageTypes = {
    Error: {
      priority: 4,
      colour: 'error'
    },
    Warning: {
      priority: 3,
      colour: 'warning'
    },
    Default: {
      priority: 2,
      colour: 'default'
    },
    Success: {
      priority: 1,
      colour: 'success'
    }
  };

  const paramStatusMapper = (status: paramStatusMessages) => {
    switch (status) {
      case paramStatusMessages.ParamInvalid:
        return {
          paramMessage: 'The parameter you have entered is invalid',
          paramMessageType: messageTypes.Error
        };

      case paramStatusMessages.ParamNotFoundInOptions:
        return {
          paramMessage: 'The parameter you have entered is not an option',
          paramMessageType: messageTypes.Error
        };

      case paramStatusMessages.ParamRequiredAndNotGiven:
        return {
          paramMessage: 'Parameter required',
          paramMessageType: messageTypes.Error
        };

      case paramStatusMessages.Undefined:
        return {
          paramMessage: null,
          paramMessageType: messageTypes.Default
        };

      case paramStatusMessages.ParamNotRequiredAndGiven:
        return {
          paramMessage: 'The parameter you have entered is redundant',
          paramMessageType: messageTypes.Success
        };

      case paramStatusMessages.ParamNotRequiredAndNotGiven:
        return {
          paramMessage: null,
          paramMessageType: messageTypes.Success
        };

      case paramStatusMessages.Valid:
        return {
          paramMessage: null,
          paramMessageType: messageTypes.Success
        };

      default:
        return {
          paramMessage: null,
          paramMessageType: messageTypes.Default
        };
    }
  };

  const botStatusMapper = (status: botStatusMessages) => {
    switch (status) {
      case botStatusMessages.BotNotFound:
        return {
          botMessage: 'No such bot found',
          botMessageType: messageTypes.Error
        };
      case botStatusMessages.NoExactMatch:
        return {
          botMessage: null,
          botMessageType: messageTypes.Warning
        };

      case botStatusMessages.Undefined:
        return {
          botMessage: null,
          botMessageType: messageTypes.Default
        };
      case botStatusMessages.Valid:
        return { botMessage: null, botMessageType: messageTypes.Success };
      default:
        return {
          botMessage: null,
          botMessageType: messageTypes.Default
        };
    }
  };

  const processCommandStatus = (commandStatusInstance: CommandStatusType) => {
    const { botMessage, botMessageType } = botStatusMapper(
      commandStatusInstance.botStatus
    );

    const { paramMessage, paramMessageType } = paramStatusMapper(
      commandStatusInstance.paramStatus
    );

    const colour =
      botMessageType.priority >= paramMessageType.priority
        ? botMessageType.colour
        : paramMessageType.colour;

    const message =
      botMessageType.priority >= paramMessageType.priority
        ? botMessage
        : paramMessage;

    const animate =
      botMessageType.priority > 3 || paramMessageType.priority > 3;

    return {
      colour,
      message,
      animate
    };
  };

  const onMouseEnterStatusLight = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: string | null
  ) => {
    console.log('hello', message);
    if (message) {
    }
  };

  const onMouseOutStatusLight = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: string | null
  ) => {
    console.log('hello', message);
    if (message) {
    }
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
