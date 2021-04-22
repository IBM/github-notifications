import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
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
        <StructuredListWrapper selection>
          <StructuredListHead>
            <StructuredListRow head>
              <StructuredListCell head>Title</StructuredListCell>
              <StructuredListCell head>Last updated</StructuredListCell>
            </StructuredListRow>
          </StructuredListHead>
          <StructuredListBody>
            {notifications.map((notification) => (
              <StructuredListRow key={notification.index}>
                <StructuredListCell>
                  <Link href={notification.url} target='_blank' key={notification.index}>
                    {notification.title}
                  </Link>
                </StructuredListCell>
                <StructuredListCell>
                  <time>{moment(notification.updated_at).fromNow()}</time>
                </StructuredListCell>
              </StructuredListRow>
            ))}
          </StructuredListBody>
        </StructuredListWrapper>
        {isLoading ? <Loading description="Active loading indicator" withOverlay={false} /> : null}
        {hasError ? <p>Sorry! There was an error loading the items</p> : null}
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
