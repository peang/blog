export interface MessagingServiceInterface {
  sendMessage(mobile: string, message: string);

  sendOTP(mobile: string, otp: number);
}