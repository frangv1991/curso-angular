import { Injectable } from '@angular/core';

import { Employee } from '../Models/employee';
import { LoggerService } from './logger.service';

@Injectable()
export class UserProviderService {

  private activeUser: Employee;
  
  constructor(private logger: LoggerService) {
    this.activeUser = new Employee('Sofía López', 'soflop@gmail.com', 'Programmer', 32, true);
  }

  sessionUser() {
    this.logger.log('Se ha recuperado al usuario dummy de sesión.');
    
    return this.activeUser;
  }
  
  updateUser(user: Employee) {
    this.logger.log('Se ha actualizado el usuario dummy.');
        
    this.activeUser = user;
  }
  
}
