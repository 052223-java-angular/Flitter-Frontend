import { Component, Input } from '@angular/core';
import { Notification } from 'src/app/models/notification/notification';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.css']
})
export class NotificationMessageComponent {
  @Input() notifications!: Notification[];
  @Input() activeNotificationType!: string;
  @Input() isHorizontal!: boolean;
  
  constructor(private notificationService: NotificationService) {}

  // updates the notification status as read
  updateNotificationAsRead(notification: Notification) : void {
    this.updateReadStatus(notification, this.notifications);
    this.notificationService.updateNotificationAsRead(notification);

    // send an update to the service that the message panel is empty
    if (this.getMessageCount(notification.type, this.notifications) <= 0) {
      this.notificationService.raiseMessagePanelIsEmpty(true);
    }

  }

  getMessageCount(notificationType: string, notifications: Notification[]) : number {
    return notifications.filter(notification => notification.type === notificationType).length;
  }


  private updateReadStatus(toUpdate: Notification, notifications: Notification[]) : void {
    notifications.forEach((notification,idx) => {
      if (notification.id == toUpdate.id) {
        notifications.splice(idx, 1);
      }
    })
  }

}
