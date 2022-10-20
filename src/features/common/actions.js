import moment from "moment";
import { setSince } from "../../actions/since";
import { fetchNotifications, moveNewNotifications, clearNewNotifications } from "../../actions/notifications";

export const fetchMoreNotifications = (since, type, dispatch) => {
  dispatch(setSince(moment().toISOString()));
  dispatch(fetchNotifications(since, type, true));
}

export const collectNewNotifications = (items, dispatch) => {
  dispatch(moveNewNotifications(items));
  dispatch(clearNewNotifications());
}

export const filterByDate = (since, type, dispatch) => {
  dispatch(fetchNotifications(since, type));
}