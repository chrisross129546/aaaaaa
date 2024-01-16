import { Account } from '../../models/classes/account';
import { UserInfo } from '../../models/interfaces/UserInfo';
import { iManagerLogin } from '../../models/interfaces/iManagerLogin';
import { iMetaAccount } from '../../models/interfaces/iMetaAccount';
import { iTrade } from '../../models/interfaces/iTrade';
import { ConnectionHealth } from './health';
import { iService } from './models/iService';
import { mt4Service } from './mt4Controller';
import { mt5Service } from './mt5Controller';
import WebSocket from 'ws';

export class MTManager {
  equitySocket: WebSocket | void = undefined;
  tradeSocket: WebSocket | void = undefined;
  url: string;
  managerDetails: iManagerLogin;
  connectionID = '';
  health: ConnectionHealth;
  controller: iService;
  Reconnecting = false;
  MT5 = false;

  constructor(url: string, managerDetails: iManagerLogin, MT5: boolean) {
    this.url = url;
    this.managerDetails = managerDetails;
    this.health = new ConnectionHealth(this);
    this.controller = MT5 ? mt5Service : mt4Service;
    this.MT5 = MT5;
  }

  // Connect to the server and start the sockets
  async connect() {
    try {
      this.connectionID = (await this.controller.Connect(this.url, this.managerDetails)) as string;
      this.Reconnecting = false;
      return await this.StartSocket();
    } catch (e: any) {
      console.log(e.message);
      this.Reconnecting = true;
      await new Promise(resolve => setTimeout(resolve, 1000 * 30));
      await this.connect();
    }
  }

  // Start the equity and trade sockets
  async StartSocket() {
    try {
      this.tradeSocket = await this.controller.StartTradeSocket(this.url, this.connectionID);
    } catch (err: any) {
      console.log(err);
    }

    if (!this.health) this.health = new ConnectionHealth(this);
    else this.health.ClearHealthCheck();

    this.health.StartHealthCheck();
  }

  //Disable an account
  async DisableAccount(account: Account): Promise<boolean> {
    try {
      return this.controller.DisableAccount(account, this.url, this.connectionID);
    } catch (err: any) {
      console.log(err);
      await this.Reconnect();
      return this.DisableAccount(account);
    }
  }

  async DeleteAccount(account: Account) {
    try {
      return this.controller.DeleteAccount(account, this.url, this.connectionID);
    } catch (err: any) {
      if (this.Reconnecting) return;
      console.log(err);
      await this.Reconnect();
      return this.controller.DeleteAccount(account, this.url, this.connectionID);
    }
  }

  async EnableAccount(account: Account) {
    return this.controller.EnableAccount(account, this.url, this.connectionID);
  }

  async Withdrawal(login: number, amount: number) {
    try {
      return this.controller.WithdrawAccount(this.url, this.connectionID, login, amount);
    } catch (err: any) {
      console.log(err);
      await this.Reconnect();

      return this.controller.WithdrawAccount(this.url, this.connectionID, login, amount);
    }
  }

  async Deposit(login: number, amount: number) {
    try {
      return this.controller.DepositAccount(this.url, this.connectionID, login, amount);
    } catch (err: any) {
      console.log(err);
      await this.Reconnect();
      return this.controller.DepositAccount(this.url, this.connectionID, login, amount);
    }
  }

  //Get all accounts
  async GetAccounts() {
    try {
      return this.controller.GetAllAccounts(this.url, this.connectionID);
    } catch (err: any) {
      console.log(err);
      await this.Reconnect();
      return this.controller.GetAllAccounts(this.url, this.connectionID);
    }
  }

  async GetAccountSummary(login: number) {
    try {
      return this.controller.GetAllAccountSummary(this.url, this.connectionID, login);
    } catch (err: any) {
      console.log(err);
      await this.Reconnect();
      return this.controller.GetAllAccountSummary(this.url, this.connectionID, login);
    }
  }

  async GetAllAccountSummary() {
    try {
      return this.controller.GetAllAccountSummary(this.url, this.connectionID);
    } catch (err: any) {
      console.log(err);
      await this.Reconnect();
      return this.controller.GetAllAccountSummary(this.url, this.connectionID);
    }
  }

  async GetAllAccountDetails() {
    try {
      return this.controller.GetAllAccountDetails(this.url, this.connectionID);
    } catch (err: any) {
      console.log(err);
      await this.Reconnect();
      return this.controller.GetAllAccountDetails(this.url, this.connectionID);
    }
  }

  async GetAccountDetails(login: number) {
    try {
      return this.controller.GetAccountDetails(login, this.url, this.connectionID);
    } catch (err: any) {
      console.log(err);
      await this.Reconnect();
      return this.controller.GetAccountDetails(login, this.url, this.connectionID);
    }
  }

  async GetAllTrades(login: number) {
    try {
      const openTrades = (await this.GetOpenTrade(login)) as iTrade[];
      const oldTrades = await this.controller.GetAllTrades(this.url, this.connectionID, login);

      return [...(Array.isArray(openTrades) ? openTrades : []), ...(Array.isArray(oldTrades) ? oldTrades : [])];
    } catch (err: any) {
      console.log(err);
      await this.Reconnect();
      const openTrades = (await this.GetOpenTrade(login)) as iTrade[];
      const oldTrades = await this.controller.GetAllTrades(this.url, this.connectionID, login);
      return [...(Array.isArray(openTrades) ? openTrades : []), ...(Array.isArray(oldTrades) ? oldTrades : [])];
    }
  }

  async GetOpenTrade(login: number) {
    try {
      return this.controller.GetOpenTrades(this.url, this.connectionID, login);
    } catch (err: any) {
      console.log(err);
      await this.Reconnect();
      return this.controller.GetOpenTrades(this.url, this.connectionID, login);
    }
  }

  async OpenTrade(login: number, order: { Symbol: string; Cmd: string; Volume: number }) {
    try {
      return this.controller.OpenTrade(this.url, this.connectionID, login, order);
    } catch (err: any) {
      console.log(err);
      await this.Reconnect();
      return this.controller.OpenTrade(this.url, this.connectionID, login, order);
    }
  }

  async GetOnlineAccounts() {
    try {
      return this.controller.GetOnline(this.url, this.connectionID);
    } catch (err: any) {
      console.log(err);
      await this.Reconnect();
      return this.controller.GetOnline(this.url, this.connectionID);
    }
  }

  async CloseAllTrades(login: number) {
    try {
      const trades = (await this.GetOpenTrade(login)) as iTrade[];
      if (trades.length > 0) {
        for (const trade of Object.values(trades)) {
          await this.controller.CloseTrade(this.url, this.connectionID, trade.order);
        }
      }
    } catch (err: any) {
      console.log(err);
      await this.Reconnect();
      const trades = (await this.GetOpenTrade(login)) as iTrade[];
      if (trades.length > 0) {
        for (const trade of Object.values(trades)) {
          this.controller.CloseTrade(this.url, this.connectionID, trade.order);
        }
      }
    }
  }

  async CloseTrade(order: number) {
    await this.controller.CloseTrade(this.url, this.connectionID, order);
  }

  async TradeJournal(to: Date, from: Date, filter: any) {
    try {
      return this.controller.TradeJournal(this.url, this.connectionID, to, from, filter);
    } catch (err: any) {
      console.log(err);
      await this.Reconnect();
      return this.controller.TradeJournal(this.url, this.connectionID, to, from, filter);
    }
  }

  async ResetPassword(login: number, password: string) {
    try {
      return this.controller.ResetPassword(this.url, this.connectionID, login, password);
    } catch (err: any) {
      console.log(err);
      await this.Reconnect();
      return this.controller.ResetPassword(this.url, this.connectionID, login, password);
    }
  }

  async ConnectionCheck() {
    try {
      return this.controller.Health(this.url, this.connectionID);
    } catch (err: any) {
      console.log(err);
      return 'Not Connected';
    }
  }
  async Ping() {
    await this.controller.Ping(this.url);
  }

  async Reconnect() {
    if (this.Reconnecting) return;
    this.connectionID = '';
    this.Reconnecting = true;
    await this.connect();
    return true;
  }
}
