import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Board from '../components/Board';

import {
  initState,
  executeCommand,
  moveSelection,
  chooseResult,
  invalidCommand,
  reset,
  search,
  updateSkateBoardText,
  markSearch
} from '../actions/index';

import { StateType } from '../reducers/types';

function mapStateToProps(state: StateType) {
  const {
    searchResult,
    selectedResult,
    searchingFor,
    allBotsDictionary,
    allBotsNames,
    skateBoardText,
    isLoading,
    selectedBot
  } = state;
  return {
    searchResult,
    selectedResult,
    searchingFor,
    allBotsDictionary,
    allBotsNames,
    skateBoardText,
    isLoading,
    selectedBot
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      initState,
      executeCommand,
      moveSelection,
      chooseResult,
      invalidCommand,
      reset,
      search,
      updateSkateBoardText,
      markSearch
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
