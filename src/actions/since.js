export function sinceSuccess(since) {
  return {
    type: 'SINCE',
    since
  };
}

export function setSince(since) {
  return (dispatch) => {
    dispatch(sinceSuccess(since));
  }
}
