export class SendEmailEvent {
  constructor(
    public readonly email: string,
    public readonly subject: string,
  ) {}
}
