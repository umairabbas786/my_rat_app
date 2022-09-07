import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
class NotificationIos {
  constructor() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        // console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      popInitialNotification: true,
      requestPermissions: true,
      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: false,
        sound: false,
      },
    });
  }
  getNotification() {
    PushNotificationIOS.getScheduledLocalNotifications(rn => {
      console.log('SN ---111- ', rn);
      console.log('SN ---- ', rn);
    });
  }
  schduleNotification(title, message, date, id) {
    PushNotificationIOS.scheduleLocalNotification({
      alertTitle: title,
      alertBody: message,
      fireDate: date,
      id,
    });
    PushNotificationIOS.setApplicationIconBadgeNumber(1);
    console.log('hello');
  }

  delNotification(id) {
    PushNotificationIOS.cancelLocalNotification(id);
  }
}

export default new NotificationIos();
