import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Info from './Info';

import { initState } from '../../actions/index';

import { StateType } from '../../reducers/types';

function mapStateToProps(state: StateType) {
  const { selectedResult, allBotsDictionary, searchingFor } = state;
  return {
    selectedResult,
    allBotsDictionary,
    searchingFor
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      initState
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Info);
