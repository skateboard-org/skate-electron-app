import { Action } from 'redux';

import {
  UPDATE_BOT_STATUS,
  UPDATE_PARAM_STATUS,
  RESET
} from '../actions/actions';

export enum botStatusMessages {
  NoExactMatch = 'NoExactMatch',
  BotNotFound = 'BotNotFound',
  Valid = 'Valid',
  Undefined = 'Undefined'
}

export enum paramStatusMessages {
  ParamNotFoundInOptions = 'ParamNotFoundInOptions',
  ParamRequiredAndNotGiven = 'ParamRequiredAndNotGiven',
  ParamNotRequiredAndGiven = 'ParamNotRequiredAndGiven',
  ParamNotRequiredAndNotGiven = 'ParamNotRequiredAndNotGiven',
  ParamInvalid = 'ParamInvalid',
  Valid = 'Valid',
  Undefined = 'Undefined',
  NoExactMatch = 'NoExactMatch'
}

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

    case paramStatusMessages.NoExactMatch:
      return {
        paramMessage: null,
        paramMessageType: messageTypes.Warning
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

export const processCommandStatus = (
  commandStatusInstance: CommandStatusType
) => {
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

  const animate = botMessageType.priority > 3 || paramMessageType.priority > 3;

  return {
    colour,
    message,
    animate
  };
};
export interface CommandStatusType {
  botStatus: botStatusMessages;
  paramStatus: paramStatusMessages;
}

export default function commandStatusReducer(
  state: CommandStatusType = {
    botStatus: botStatusMessages.Undefined,
    paramStatus: paramStatusMessages.Undefined
  },
  action: Action<string>
) {
  switch (action.type) {
    case UPDATE_BOT_STATUS: {
      return {
        paramStatus: state.paramStatus,
        botStatus: action.payload.status
      };
    }
    case UPDATE_PARAM_STATUS: {
      return {
        paramStatus: action.payload.status,
        botStatus: state.botStatus
      };
    }
    case RESET: {
      return {
        paramStatus: paramStatusMessages.Undefined,
        botStatus: botStatusMessages.Undefined
      };
    }
    default:
      return state;
  }
}
