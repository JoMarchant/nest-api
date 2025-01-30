import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola! Soy el servidor de la aplicación de José Marchant';
  }
}
