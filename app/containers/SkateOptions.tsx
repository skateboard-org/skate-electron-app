import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Options from '../components/Options';

import { chooseResult } from '../actions/index';

import { StateType } from '../reducers/types';

function mapStateToProps(state: StateType) {
  const { searchResult, selectedResult } = state;
  return {
    searchResult,
    selectedResult
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      chooseResult
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Options);
