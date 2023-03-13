
export class DomainException extends Error {
  private entity: any;

  constructor(msg: string, entity: any) {
    super(msg)

    this.entity = entity;
  }

  public getEntity(): any {
    return this.entity
  }
}