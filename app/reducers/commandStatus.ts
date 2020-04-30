import { Action } from 'redux';

import {
  UPDATE_BOT_STATUS,
  UPDATE_PARAM_STATUS,
  RESET
} from '../actions/actions';

export enum botStatusMessages {
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
  Undefined = 'Undefined'
}

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
