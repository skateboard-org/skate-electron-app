import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Board from './Board';

import {
  initState,
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
    selectedBot
  } = state;
  return {
    searchResult,
    selectedResult,
    searchingFor,
    allBotsDictionary,
    allBotsNames,
    skateBoardText,
    selectedBot
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      initState,
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
