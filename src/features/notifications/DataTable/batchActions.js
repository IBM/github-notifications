const { NotificationOff, Notification } = require("@carbon/icons-react");

module.exports = [
  {
    id: 'mute',
    text: 'Mute',
    icon: NotificationOff,
    bool: true
  },
  {
    id: 'unmute',
    text: 'Unmute',
    icon: Notification,
    bool: false
  }
];