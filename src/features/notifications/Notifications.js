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
import { ExpandAll32 } from '@carbon/icons-react';
import { withRouter } from "react-router-dom";
import { fetchNotifications, selectNotification } from '../../actions/notifications';

class Notifications extends Component {
  constructor(props) {
    super(props);
    if (!props.notifications.length) {
      props.fetchNotifications();
    }
  }

  selectNotification(notification) {
    this.props.selectNotification(notification);
    this.props.history.push('/details');
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
    const { notifications, haveNotificationsError, areNotificationsLoading, fetchNotifications } = this.props;

    return (
      <div className="notifications__main">
        <Button onClick={() => fetchNotifications()} className="notifications__main__button">Update</Button>
        <div className="notifications__main__list">
          <StructuredListWrapper selection>
            <StructuredListHead>
              <StructuredListRow head>
                <StructuredListCell head>Title</StructuredListCell>
                <StructuredListCell head>Last updated</StructuredListCell>
                <StructuredListCell head>Reason</StructuredListCell>
                <StructuredListCell head>{' '}</StructuredListCell>
              </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
              {notifications.map((notification) => (
                <StructuredListRow key={notification.index}>
                  <StructuredListCell>
                    <Link href={notification.html_url} target='_blank' key={notification.index}>
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
                  <StructuredListCell>
                    <Button
                      kind="tertiary"
                      renderIcon={ExpandAll32}
                      iconDescription="Details"
                      hasIconOnly
                      onClick={() => {this.selectNotification(notification)}}
                    />
                  </StructuredListCell>
                </StructuredListRow>
              ))}
            </StructuredListBody>
          </StructuredListWrapper>
        </div>
        {areNotificationsLoading ? <Loading description="Active loading indicator" withOverlay /> : null}
        {haveNotificationsError ? <p>Sorry! There was an error loading the items</p> : null}
      </div>
    );
  }
}

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  haveNotificationsError: PropTypes.bool.isRequired,
  areNotificationsLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    notifications: state.notifications.notifications,
    haveNotificationsError: state.notifications.haveNotificationsError,
    areNotificationsLoading: state.notifications.areNotificationsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNotifications: () => dispatch(fetchNotifications()),
    selectNotification: (notification) => dispatch(selectNotification(notification))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notifications));
