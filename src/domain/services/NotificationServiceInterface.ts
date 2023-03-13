export interface NotifcationPayload {
  title: string;
  body: string;
  imageUrl?: string;
  data: Record<any, any>;
}

export interface NotificationServiceInterface {
  sendToTopic(topic: string, payload: NotifcationPayload)
}