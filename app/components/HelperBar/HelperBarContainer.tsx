import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import HelperBar from './HelperBar';

import { loadBots } from '../../actions/index';

import { StateType } from '../../reducers/types';

function mapStateToProps(state: StateType) {
  const { commandStatus } = state;
  return {
    commandStatus
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      loadBots
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(HelperBar);
