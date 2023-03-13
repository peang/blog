export interface FCMNotificationPayload {
  title: string;
  body: string;
  screen?: string;
  imageUrl?: string;
  data: string;
  type?: string;
  tokens: string[];
}

export class FCMServiceInterface {

}