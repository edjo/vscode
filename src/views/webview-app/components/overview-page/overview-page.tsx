import * as React from 'react';
import { connect } from 'react-redux';
import { ActionTypes, LinkClickedAction } from '../../store/actions';

const styles = require('../../connect.module.less');

type dispatchProps = {
  onLinkClicked: (screen: string, linkId: string) => void;
};

type props = dispatchProps;

class Overview extends React.Component<props> {
  onLinkClicked = (screen: string, linkId: string): void => {
    this.props.onLinkClicked(screen, linkId);
  };

  render(): React.ReactNode {
    return (
      <div className={styles.overview}>
        Overview
      </div>
    );
  }
}

const mapDispatchToProps: dispatchProps = {
  onLinkClicked: (screen, linkId): LinkClickedAction => ({
    type: ActionTypes.EXTENSION_LINK_CLICKED,
    screen,
    linkId
  })
};

export default connect(() => ({}), mapDispatchToProps)(Overview);
