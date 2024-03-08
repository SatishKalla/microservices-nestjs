export class CreateTaskEvent {
  constructor(
    public readonly description: string,
    public readonly estimatedDays: number,
  ) {}
}
