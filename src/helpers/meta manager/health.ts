import { clearInterval } from 'timers';
import { MTManager } from './metaManager';
import WebSocket = require('ws');

let lastMessage: any = null;

export class ConnectionHealth {
  manager: MTManager;
  latency = 0;
  timer: any;
  timer1: any;
  constructor(m: MTManager) {
    this.manager = m;
  }

  async StartHealthCheck() {
    this.timer = setInterval(async () => {
      const { MT5_BACKUP_URL, MT5_URL } = process.env;

      try {
        const connection = await this.manager.ConnectionCheck();
        if (connection != 'Connected') {
          console.log('Not connected to ', this.manager.MT5 ? 'MT5' : 'MT4');

          this.manager.MT5 && (this.manager.url = (this.manager.url == MT5_BACKUP_URL ? MT5_URL : MT5_BACKUP_URL) || '');

          this.manager.Reconnect();
          clearInterval(this.timer);
          clearInterval(this.timer1);
        }
      } catch {
        console.log('error connecting to ', this.manager.MT5 ? 'MT5' : 'MT4');

        this.manager.MT5 && (this.manager.url = (this.manager.url == MT5_BACKUP_URL ? MT5_URL : MT5_BACKUP_URL) || '');
        this.manager.Reconnect();

        clearInterval(this.timer);
        clearInterval(this.timer1);
      }
    }, 1000 * 5);

    lastMessage = new Date().getTime();

    let restarting = false;
    this.timer1 = setInterval(() => {
      if (lastMessage) this.latency = new Date().getTime() - lastMessage;

      if (this.latency > 30000 && !restarting) {
        restarting = true;
        clearInterval(this.timer);
        clearInterval(this.timer1);
        this.manager.StartSocket();
      }
    }, 15000);
  }

  async ClearHealthCheck() {
    clearInterval(this.timer);
    clearInterval(this.timer1);
  }
}
