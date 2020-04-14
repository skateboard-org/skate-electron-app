import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Panel from '../components/Panel';

import { initState } from '../actions/index';

import { StateType } from '../reducers/types';

function mapStateToProps(state: StateType) {
  const { skatePanel, botResponseType } = state;
  return {
    skatePanel,
    botResponseType
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

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
