export interface EmailServiceInterface {
  sendUserAMOSInvitation(to: string[], username: string, password: string)

  sendUserAMOSResetPasswordNotification(to: string[], username: string, password: string)

  sendUserTenantUpdateEmail(to: string[], name: string, token: string)
}