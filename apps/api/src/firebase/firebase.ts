import admin, {ServiceAccount} from "firebase-admin";
import {
  BatchResponse,
  MulticastMessage,
  Notification,
} from "firebase-admin/lib/messaging/messaging-api";
import fancyLogger from "../core/logger/fancy-logger";
import { FirebaseConfig } from "./firebase.config";

export class Firebase {
  private static _thresold = 999;

  static init() {
    fancyLogger.log("extra", "Firebase app initialized");
    admin.initializeApp({
      credential: admin.credential.cert(FirebaseConfig as ServiceAccount),
      databaseURL: "https://tashan-bacf5.firebaseio.com",
    });
  }

  private static _sendNotification(
    message: MulticastMessage
  ): Promise<BatchResponse> {
    return admin.messaging().sendMulticast(message);
  }

  /**
   * @param tokens user fcm tokens
   * @param payload title, and body of notification
   * @returns promise of notification result, can return array or single object
   */
  static sendNotification(
    tokens: string[],
    payload: Notification
  ): Promise<BatchResponse> | Promise<BatchResponse[]> | Promise<string> {
    const _length = tokens.length;
    if(!_length) {
      return Promise.resolve('token array empty')
    }

    //splitting firebase tokens in chunks because firebase can only send message to notification to 1000 devices at once
    if (_length > this._thresold) {
      const promises: Promise<BatchResponse>[] = [];
      for (let i = 0; i < _length; i += this._thresold) {
        const _token = tokens.slice(i, i + this._thresold);
        const promise = this._sendNotification({
          notification: payload,
          tokens: _token,
        });
        promises.push(promise);
      }
      return Promise.all(promises);
    }

    return this._sendNotification({ notification: payload, tokens });
  }
}
