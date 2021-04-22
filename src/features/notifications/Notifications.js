import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Button,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListBody,
  StructuredListRow,
  StructuredListCell,
  Link,
  Loading,
  Tag
} from 'carbon-components-react';
import { notificationsFetchData } from '../../actions/notifications';

class Notifications extends Component {
  constructor(props) {
    super(props);
    props.fetchData();
  }

  testNotifications() {
    this.props.fetchData();
  }

  tagReason(reason) {
    switch (reason) {
      case 'review_requested':
        return <Tag type="red" title={reason}>{reason}</Tag>;
      case 'mention':
        return <Tag type="green" title={reason}>{reason}</Tag>;
      default:
        return <Tag type="gray" title={reason}>{reason}</Tag>;
    }
  }

  render() {
    const { notifications, hasError, isLoading } = this.props;

    return (
      <div className="notifications__main">
        <Button onClick={() => this.testNotifications()} className="notifications__main__button">Update</Button>
        <div className="notifications__main__list">
          <StructuredListWrapper selection>
            <StructuredListHead>
              <StructuredListRow head>
                <StructuredListCell head>Title</StructuredListCell>
                <StructuredListCell head>Last updated</StructuredListCell>
                <StructuredListCell head>Reason</StructuredListCell>
              </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
              {notifications.map((notification) => (
                <StructuredListRow key={notification.index}>
                  <StructuredListCell>
                    <Link href={notification.url} target='_blank' key={notification.index}>
                      <h6>{notification.full_name}</h6>
                      <h4>{notification.title}</h4>
                    </Link>
                  </StructuredListCell>
                  <StructuredListCell>
                    <time>{moment(notification.updated_at).fromNow()}</time>
                  </StructuredListCell>
                  <StructuredListCell>
                    {this.tagReason(notification.reason)}
                  </StructuredListCell>
                </StructuredListRow>
              ))}
            </StructuredListBody>
          </StructuredListWrapper>
        </div>
        {isLoading ? <Loading description="Active loading indicator" withOverlay /> : null}
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
