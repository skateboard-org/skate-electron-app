import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import StatusLight from './StatusLight';

import { updateCommandStatus } from '../../actions/index';

import { StateType } from '../../reducers/types';

function mapStateToProps(state: StateType) {
  const { commandStatus, isLoading, isInitialising } = state;
  return {
    commandStatus,
    isLoading,
    isInitialising
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      updateCommandStatus
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusLight);
