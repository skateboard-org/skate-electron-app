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
  NoExactMatch = 'NoExactMatch',
  Empty = 'Empty'
}

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
        paramSuggestion: null,
        paramMessageType: messageTypes.Error
      };

    case paramStatusMessages.ParamNotFoundInOptions:
      return {
        paramMessage: 'The parameter you have entered is not an option',
        paramSuggestion: null,
        paramMessageType: messageTypes.Error
      };

    case paramStatusMessages.ParamRequiredAndNotGiven:
      return {
        paramMessage: 'Parameter required',
        paramSuggestion: null,
        paramMessageType: messageTypes.Error
      };

    case paramStatusMessages.Undefined:
      return {
        paramMessage: null,
        paramSuggestion: null,
        paramMessageType: messageTypes.Default
      };

    case paramStatusMessages.NoExactMatch:
      return {
        paramMessage: null,
        paramSuggestion: null,
        paramMessageType: messageTypes.Warning
      };

    case paramStatusMessages.Empty:
      return {
        paramMessage: null,
        paramSuggestion: 'parameter required',
        paramMessageType: messageTypes.Warning
      };

    case paramStatusMessages.ParamNotRequiredAndGiven:
      return {
        paramMessage: null,
        paramSuggestion: 'The parameter you have entered is redundant',
        paramMessageType: messageTypes.Warning
      };

    case paramStatusMessages.ParamNotRequiredAndNotGiven:
      return {
        paramMessage: null,
        paramSuggestion: 'press enter to run',
        paramMessageType: messageTypes.Success
      };

    case paramStatusMessages.Valid:
      return {
        paramMessage: null,
        paramSuggestion: 'press enter to run',
        paramMessageType: messageTypes.Success
      };

    default:
      return {
        paramMessage: null,
        paramSuggestion: null,
        paramMessageType: messageTypes.Default
      };
  }
};

const botStatusMapper = (status: botStatusMessages) => {
  switch (status) {
    case botStatusMessages.BotNotFound:
      return {
        botMessage: 'No such bot found',
        botMessageType: messageTypes.Error,
        botSuggestion: null
      };
    case botStatusMessages.NoExactMatch:
      return {
        botMessage: null,
        botMessageType: messageTypes.Warning,
        botSuggestion: null
      };

    case botStatusMessages.Undefined:
      return {
        botMessage: null,
        botMessageType: messageTypes.Default,
        botSuggestion: null
      };
    case botStatusMessages.Valid:
      return {
        botMessage: null,
        botMessageType: messageTypes.Success,
        botSuggestion: 'press enter to run'
      };
    default:
      return {
        botMessage: null,
        botMessageType: messageTypes.Default,
        botSuggestion: null
      };
  }
};

export const processCommandStatus = (
  commandStatusInstance: CommandStatusType
) => {
  const { botMessage, botMessageType, botSuggestion } = botStatusMapper(
    commandStatusInstance.botStatus
  );

  const { paramMessage, paramMessageType, paramSuggestion } = paramStatusMapper(
    commandStatusInstance.paramStatus
  );

  const biggestErrorIsInBot =
    botMessageType.priority >= paramMessageType.priority;

  const colour = biggestErrorIsInBot
    ? botMessageType.colour
    : paramMessageType.colour;

  const message = biggestErrorIsInBot ? botMessage : paramMessage;

  const suggestion = biggestErrorIsInBot ? botSuggestion : paramSuggestion;

  return {
    colour,
    message,
    suggestion
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
