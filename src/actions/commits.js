const utils = require('../utils/details');

export function commitsHaveError(bool) {
  return {
    type: 'COMMITS_HAVE_ERROR',
    haveCommitsError: bool
  };
}

export function commitsAreLoading(bool) {
  return {
    type: 'COMMITS_ARE_LOADING',
    areCommitsLoading: bool
  };
}

export function commitsFetchSuccess(commits) {
  return {
    type: 'COMMITS_FETCH_DATA_SUCCESS',
    commits
  };
}

export function commitsFetch(url = '') {
  return (dispatch) => {
    dispatch(commitsAreLoading(true));
    utils.getCommits(url)
      .then((response) => {
        dispatch(commitsFetchSuccess(response))
      })
      .catch((error) => {
        dispatch(commitsHaveError(true))
      })
  }
}
