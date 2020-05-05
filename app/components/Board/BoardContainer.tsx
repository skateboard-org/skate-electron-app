import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Board from './Board';

import {
  executeCommand,
  moveSelection,
  storeBotName,
  reset,
  search,
  updateSkateBoardText,
  markSearch,
  updateCommandStatus
} from '../../actions/index';

import { StateType } from '../../reducers/types';

function mapStateToProps(state: StateType) {
  const {
    searchResult,
    selectedResult,
    searchingFor,
    allBotsDictionary,
    allBotsNames,
    skateBoardText,
    selectedBot,
    isInitialising
  } = state;
  return {
    searchResult,
    selectedResult,
    searchingFor,
    allBotsDictionary,
    allBotsNames,
    skateBoardText,
    selectedBot,
    isInitialising
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      executeCommand,
      moveSelection,
      storeBotName,
      reset,
      search,
      updateSkateBoardText,
      markSearch,
      updateCommandStatus
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
