import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigsService } from "src/configs/configs.service";
import * as admin from 'firebase-admin';
import { ServiceAccount } from "firebase-admin";
import { InternalOAuthError } from "passport-oauth2";
@Injectable()
export class NotificationsService {
    constructor(private configsService: ConfigsService) {
        const adminConfig: ServiceAccount = {
            "projectId": configsService.get('FIREBASE_PROJECT_ID'),
            "privateKey": configsService.get('FIREBASE_PRIVATE_KEY')
              .replace(/\\n/g, '\n'),
            "clientEmail": configsService.get('FIREBASE_CLIENT_EMAIL'),
          };
        
          admin.initializeApp({
            credential: admin.credential.cert(adminConfig),
          });
    }
    public async sendNotification(token: string, payload: any): Promise<any> {
        try {
            const result = await admin.messaging().sendToDevice(token, payload);
            return result;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    
}