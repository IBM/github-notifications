import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { commitsFetch } from '../../actions/commits';

class Details extends Component {
  constructor(props) {
    super(props);
    props.fetchCommits();
  }

  render() {
    const { notificationsSelected } = this.props;

    return (
      <div className="details__main">
        { JSON.stringify(notificationsSelected) }
      </div>
    );
  }
}

Details.propTypes = {
  notificationsSelected: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    notificationsSelected: state.notifications.selected
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCommits: (url) => dispatch(commitsFetch(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
