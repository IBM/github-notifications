export const initialState = {
  since: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SINCE':
      return { ...state, since: action.since }
    default:
      return {...state};
  }
}

export default reducer;
