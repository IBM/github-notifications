import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notificationsFetchData } from '../../actions/notifications';

class Notifications extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  testNotifications() {
    this.props.fetchData();
  }

  render() {
    const { notifications, hasError, isLoading } = this.props;

    return (
      <div>
        <button onClick={() => this.testNotifications()}>fetch</button>
        {isLoading ? <p>Loading…</p> : null}
        {hasError ? <p>Sorry! There was an error loading the items</p> : null}
        <ul>
          {notifications.map((notification) => (
            <a href={notification.url} target='_blank' key={notification.index}>
              <li>{notification.title}</li>
            </a>
          ))}
        </ul>
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
  return {
    notifications: state.notifications.notifications,
    hasError: state.hasError,
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(notificationsFetchData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
