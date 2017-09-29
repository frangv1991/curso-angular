export class LoggerService {

  constructor() { }

  log(msg: any)   {
    console.log('DEBUG\n' + msg);
  }
  
  error(msg: any) {
    console.error('ERROR\n' + msg);
  }
  
  warn(msg: any)  {
    console.warn('WARNING\n' + msg);
  }  
}
