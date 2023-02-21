import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import UseEffects from '../src/features/notifications/useEffects';
import {
  allNotifications,
  allNewNotifications,
  subscriptions,
} from './mocks';

const mockStore = configureMockStore();
configure({ adapter: new Adapter() });

const children = <div>test</div>;
const notifications = [
  {
    full_name: "managed-security/glass-webui",
    html_url: "https://github.***REMOVED***/managed-security/glass-webui/pull/551",
    id: "123",
    ignored: false,
    jira: "XPS-103742",
    reason: "author",
    subscribed: true,
    title: "XPS-103742 - add text area character counter everywhere except alert description; additionally - change alert translations naming convention",
    type: "PullRequest",
    unread: true,
    updated_at: "2022-11-16T20:05:32Z"
  }
];

const getInitialState = () => {
  return {
    notifications: {
      haveNotificationsError: false
    }
  }
};

describe('<UseEffects />', () => {
  let component;
  let store;
  let useEffectsComponent;

  const initialState = getInitialState();
  const getProps = (allNewNotifications = [], erroredSubscriptions = []) => {
    return {
      children,
      notifications,
      allNotifications: allNotifications,
      allNewNotifications,
      areNotificationsLoading: false,
      isSettingSubscriptionLoading: false,
      hasSettingSubscriptionError: false,
      isGetThreadSubscriptionLoading: false,
      setNotifications: jest.fn(),
      setSubscription: '',
      dispatch: jest.fn(),
      since: moment().toISOString(),
      subscriptions: subscriptions,
      erroredSubscriptions
    }
  }

  describe('No NEW Notifications', () => {
    beforeEach(() => {
      store = mockStore(initialState);
      component = mount(
        <Provider store={store}>
          <UseEffects {...getProps()} />
        </Provider>
      );
      useEffectsComponent = component.find('UseEffects');
    })

    it('useEffects init - setNotifications must be 2', () => {
      const setNotifications = useEffectsComponent.props().setNotifications;
      const setNotificationsMockCalls = setNotifications.mock.calls;
      expect(setNotifications).toHaveBeenCalledTimes(2);
      expect(setNotificationsMockCalls).toEqual([[notifications], [notifications]]);
    });
  });

  describe('NEW Notifications', () => {
    beforeEach(() => {
      store = mockStore(initialState);
      component = mount(
        <Provider store={store}>
          <UseEffects {...getProps(allNewNotifications)} />
        </Provider>
      );
      useEffectsComponent = component.find('UseEffects');
    })

    it('setNotifications must be 2', () => {
      const setNotifications = useEffectsComponent.props().setNotifications;
      const setNotificationsMockCalls = setNotifications.mock.calls;
      expect(setNotifications).toHaveBeenCalledTimes(2);
      expect(setNotificationsMockCalls).toEqual([[notifications], [notifications]]);
    });
  });
});