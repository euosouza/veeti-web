import { Injectable, signal } from "@angular/core";
import { INotification } from "../interfaces/notification.interface";

// This service might not have an API if it's purely frontend transient state or socket based.
// For now, assuming it's a simple store.

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  notifications = signal<INotification[]>([]);

  add(notification: INotification) {
    this.notifications.update((n) => [notification, ...n]);
  }

  markAsRead(id: string) {
    this.notifications.update((n) => n.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)));
  }
}
