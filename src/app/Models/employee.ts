export class Employee {
  constructor(
      public name: string = '',
      public email: string = '',
      public job?: string,
      public age?: number,
      public isActive?: boolean,
      public valoration: number = 3,
      public id = null
  ) {} 
}
