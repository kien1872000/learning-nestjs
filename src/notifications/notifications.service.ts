import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigsService } from "src/configs/configs.service";
import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";

@Injectable()
export class NotificationsService {
  private db;
  constructor(configsService: ConfigsService) {
    const adminConfig: ServiceAccount = {
      projectId: configsService.get('FIREBASE_PROJECT_ID'),
      privateKey: configsService
        .get('FIREBASE_PRIVATE_KEY')
        .replace(/\\n/g, '\n'),
      clientEmail: configsService.get('FIREBASE_CLIENT_EMAIL'),
    };
    admin.initializeApp({
      credential: admin.credential.cert(adminConfig),
      databaseURL: configsService.get('DATABASE_URL'),
    });
    this.db = admin.database();
  }
  public async sendNotification(token: string, payload: any): Promise<any> {
    try {
      const result = await admin.messaging().sendToDevice(token, payload);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  public async insertUser(): Promise<void> {
    this.db.ref('/user').set([
      {
        email: 'kien123.com',
        password: 'hello1',
        disPlayName: 'kien1',
        age: 12,
        address: 'Hai Phong 1',
      },
    ])
  }
  public async addNewUser() {
    this.db.ref('/user').push({
      id: 5,
      email: 'kien123.com11',
      password: 'hello1111',
      disPlayName: 'kien13',
      age: 12,
      address: 'Hai Phong2 1',
    });
  }
  public async getUser(): Promise<any> {
    return await this.db.ref('/user/0').once('value');
  }
  public updateUser() {
    const update = {
      email: '18020731@gmail.com',
      password: 'chung toi la chien si',
    }
    return this.db.ref('/user/-MhA7uAOhfbuX2ZaQWz3').update(update);
  }
}
