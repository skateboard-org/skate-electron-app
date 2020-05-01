import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Options from './Options';

import { storeBotName } from '../../actions/index';

import { StateType } from '../../reducers/types';

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
      storeBotName
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Options);
