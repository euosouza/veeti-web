// Internal system notifications (Toast/Bell)
export interface INotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface ICreateNotification {
  userId: string;
  title: string;
  message: string;
}
