import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Panel from '../components/Panel';

import { onSkateBoardTextUpdate, initState, onKeyDown } from '../actions/index';

import { StateType } from '../reducers/types';

function mapStateToProps(state: StateType) {
  const {
    skateBoardText,
    selectedBot,
    searchingFor,
    searchResult,
    selectedParam,
    selectedResult
  } = state;
  return {
    skateBoardText,
    selectedBot,
    searchingFor,
    searchResult,
    selectedParam,
    selectedResult
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      onSkateBoardTextUpdate,
      onKeyDown,
      initState
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
