import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Panel from '../components/Panel';

import { reset } from '../actions/index';

import { StateType } from '../reducers/types';

function mapStateToProps(state: StateType) {
  const { skatePanel, botResponseType, isLoading } = state;
  return {
    skatePanel,
    botResponseType,
    isLoading
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      reset
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
