export const initialState = {
  areCommitsLoading: false,
  haveCommitsError: false,
  commits: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'COMMITS_ARE_LOADING':
      return { ...state, areCommitsLoading: action.areCommitsLoading };
    case 'COMMITS_HAVE_ERROR':
      return { ...state, error: action.haveCommitsError };
    case 'COMMITS_FETCH_DATA_SUCCESS':
      return { ...state, ...action.commits, areCommitsLoading: false };
    default:
      return { ...state };
  }
};

export default reducer;
