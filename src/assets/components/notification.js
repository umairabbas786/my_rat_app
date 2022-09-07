import PushNotification from 'react-native-push-notification';
class Notification {
  constructor() {
    PushNotification.configure({
      onRegister: function (token) {
        console.log(token);
      },

      onNotification: function (notification) {
        console.log('Notification', notification);
      },
      popInitialNotification: true,
      requestPermissions: false,
    });
    PushNotification.createChannel(
      {
        channelId: 'reminders',
        channelName: 'Task reminder notification',
        channelDescription: 'Reminder for any Task',
      },
      () => {},
    );
    PushNotification.getScheduledLocalNotifications(rn => {
      console.log('SN ---- ', rn);
    });
  }

  schduleNotification(title, message, date, id) {
    PushNotification.localNotificationSchedule({
      channelId: 'reminders',
      title: title,
      message,
      date,
      id,
      repeatInterval: 2,
      number: id,
    });
    PushNotification.setApplicationIconBadgeNumber(1);
  }
  getNotification() {
    PushNotification.getScheduledLocalNotifications(arr => {
      console.log('nnotifications');
      console.log(arr);
      return arr;
    });
  }
  delNotification(id) {
    PushNotification.cancelLocalNotification(id);
  }
  setBadge(number) {
    PushNotification.setApplicationIconBadgeNumber(number);
  }
}

export default new Notification();
