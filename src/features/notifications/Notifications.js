import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, StructuredListWrapper, StructuredListHead, StructuredListBody, StructuredListRow, StructuredListCell, Link, Loading } from 'carbon-components-react';
import { notificationsFetchData } from '../../actions/notifications';

class Notifications extends Component {
  constructor(props) {
    super(props);
    props.fetchData();
  }

  testNotifications() {
    this.props.fetchData();
  }

  render() {
    const { notifications, hasError, isLoading } = this.props;

    return (
      <div>
        <Button onClick={() => this.testNotifications()}>test</Button>
        {isLoading ? <Loading description="Active loading indicator" withOverlay={false} /> : null}
        {hasError ? <p>Sorry! There was an error loading the items</p> : null}
        <StructuredListWrapper selection>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head>{''}</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {notifications.map((notification) => (
              <StructuredListRow key={notification.index}>
                <Link href={notification.url} target='_blank' key={notification.index}>
                  <StructuredListCell key={notification.index}>{`${notification.title} - updated ${notification.updated_at}`}</StructuredListCell>
                </Link>
              </StructuredListRow>
            ))}
          </StructuredListBody>
        </StructuredListWrapper>
      </div>
    );
  }
}

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  hasError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    notifications: state.notifications.notifications,
    hasError: state.notifications.hasError,
    isLoading: state.notifications.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(notificationsFetchData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
