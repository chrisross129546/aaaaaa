import { Account } from '../../models/classes/account';
import { UserInfo } from '../../models/interfaces/UserInfo';
import { iAPI } from '../../models/interfaces/iAPI';
import { iManagerLogin } from '../../models/interfaces/iManagerLogin';
import { iMetaAccount } from '../../models/interfaces/iMetaAccount';
import { iTrade } from '../../models/interfaces/iTrade';
import { API } from '../API Calls/controller';
import { iService } from './models/iService';
import WebSocket from 'ws';

export class controller implements iService {
  private API: iAPI;

  constructor(api: iAPI) {
    this.API = api;
  }

  async ResetPassword(url: string, connectionID: string, login: number, password: string): Promise<boolean> {
    const res = (
      await this.API.Get(
        `${url}/ChangePassword`,
        {},
        {
          id: connectionID,
          login,
          password,
        }
      )
    ).data;

    if (res.status !== 200) throw new Error('Password Reset Failed');
    else return true;
  }

  async OpenTrade(url: string, connectionID: string, login: number, order: { Cmd: string; Volume: number; Symbol: string }): Promise<number> {
    const res = await this.API.Get(
      `${url}/OrderSend`,
      {},
      {
        id: connectionID,
        login,
        symbol: order.Symbol,
        volume: order.Volume,
        operation: order.Cmd,
      }
    );
    return res.data.order;
  }

  async Health(url: string, connectionID: string): Promise<'Connected' | 'Not Connected'> {
    const res = await this.API.Get(
      `${url}/Health/`,
      {},
      {
        id: connectionID,
      }
    );
    return res.data;
  }

  async TradeJournal(url: string, connectionID: string, to: Date, from: Date, filter: any): Promise<any> {
    const res = await this.API.Get(
      `${url}/TradeJournal/`,
      {},
      {
        id: connectionID,
        mode: 2,
        to: to,
        from: from,
        filter: filter,
      }
    );
    return res.data;
  }

  async Connect(url: string, { user, password, host }: iManagerLogin): Promise<string> {
    const res = await this.API.Get(`${url}/Connect?user=${user}&password=${password}&server=${host}`);

    const message = res.data.message;
    if (message == 'NoConnect' || message == 'Invalid account' || message == 'BadAccountInfo') throw new Error(message);
    else console.log('Connected to MetaTrader', host);

    return res.data;
  }

  async StartEquitySocket(url: string, connectionID: string): Promise<WebSocket> {
    const websocket = new WebSocket(`ws://${url.replace('http://', '')}/OnOrderProfit?id=${connectionID}`, undefined);

    websocket.once('open', () => console.log(url, 'Equity Socket Opened'));
    websocket.addEventListener('error', (err: any) => console.log(err));
    websocket.once('close', (err: any) => console.log(err));

    return websocket;
  }

  async StartTradeSocket(url: string, connectionID: string): Promise<WebSocket> {
    const websocket = new WebSocket(`ws://${url.replace('http://', '')}/OnUpdateTrades?id=${connectionID}`, undefined);

    websocket.once('open', () => console.log(url, 'Trade Socket Opened'));
    websocket.addEventListener('error', (err: any) => console.log(err));
    websocket.once('close', (err: any) => console.log(err));

    return websocket;
  }

  async GetAllTrades(url: string, connectionID: string, login: number): Promise<iTrade[]> {
    const res = await this.API.Get(
      `${url}/OrderHistory`,
      {},
      {
        id: connectionID,
        login,
      }
    );
    return res.data;
  }

  async GetOpenTrades(url: string, connectionID: string, login: number): Promise<iTrade[]> {
    const res = await this.API.Get(
      `${url}/TradesRequest`,
      {},
      {
        id: connectionID,
        login,
      }
    );

    return res.data;
  }

  async CloseTrade(
    url: string,
    connectionID: string,
    order: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    comment?: string
  ): Promise<iTrade[]> {
    return (
      await this.API.Get(
        `${url}/OrderClose`,
        {},
        {
          id: connectionID,
          ticket: order,
        }
      )
    ).data;
  }

  //Gets balances
  async GetAllAccountSummary(url: string, connectionID: string, login?: number): Promise<any> {
    const res = await this.API.Get(
      `${url}/AccountsSummary`,
      {},
      {
        id: connectionID,
        login: login,
      }
    );
    return res.data;
  }

  //Gets Full account details
  async GetAllAccountDetails(url: string, connectionID: string): Promise<any> {
    ``;

    const res = await this.API.Get(
      `${url}/AccountDetailsMany/`,
      {},
      {
        id: connectionID,
      }
    );

    return res.data;
  }

  async GetAccountDetails(login: number, url: string, connectionID: string): Promise<any> {
    const res = await this.API.Get(
      `${url}/AccountDetails/`,
      {},
      {
        id: connectionID,
        login,
      }
    );

    return res.data;
  }

  async GetAllAccounts(url: string, connectionID: string): Promise<number[]> {
    const res = await this.API.Get(
      `${url}/Accounts/`,
      {},
      {
        id: connectionID,
      }
    );

    return res.data;
  }

  async GetOnline(url: string, connectionID: string): Promise<number[]> {
    const res = await this.API.Get(
      `${url}/OnlineRequest/`,
      {},
      {
        id: connectionID,
      }
    );

    return res.data;
  }

  async CreateAccount(args: UserInfo, url: string, connectionID: string, login?: number): Promise<iMetaAccount> {
    const account = (
      await this.API.Get(
        `${url}/AccountCreate`,
        {},
        {
          id: connectionID,
          login,
          name: args.name,
          email: args.email,
          enable: true,
          leverage: args.leverage,
          group: args.group,
        }
      )
    ).data;

    await this.API.Get(
      `${url}/Deposit`,
      {},
      {
        id: connectionID,
        login: account.login,
        amount: args.balance,
        comment: 'initial deposit',
      }
    );

    return account;
  }

  async EnableAccount(account: Account, url: string, connectionID: string): Promise<boolean> {
    const accountDetails = (
      await this.API.Get(
        `${url}/AccountDetails`,
        {},
        {
          id: connectionID,
          login: account.login,
        }
      )
    ).data;

    await this.API.Get(
      `${url}/AccountUpdate`,
      {},
      {
        id: connectionID,
        name: accountDetails.name,
        email: account.email,
        login: account.login,
        enable: true,
        enableReadOnly: false,
        group: accountDetails.group,
        leverage: accountDetails.leverage,
      }
    );
    return true;
  }

  async DisableAccount(account: Account, url: string, connectionID: string): Promise<boolean> {
    const accountDetails = (
      await this.API.Get(
        `${url}/AccountDetails`,
        {},
        {
          id: connectionID,
          login: account.login,
        }
      )
    ).data;

    await this.API.Get(
      `${url}/AccountUpdate`,
      {},
      {
        id: connectionID,
        name: accountDetails.name,
        email: account.email,
        login: account.login,
        enable: true,
        enableReadOnly: true,
        group: accountDetails.group,
        leverage: accountDetails.leverage,
      }
    );
    return true;
  }

  async DeleteAccount(account: Account, url: string, connectionID: string): Promise<boolean> {
    const accountDetails = (
      await this.API.Get(
        `${url}/AccountDelete`,
        {},
        {
          id: connectionID,
          login: account.login,
        }
      )
    ).data;

    return true;
  }

  async WithdrawAccount(url: string, connectionID: string, login: number, amount: number): Promise<boolean> {
    await this.API.Get(
      `${url}/Deposit`,
      {},
      {
        id: connectionID,
        login,
        amount: amount * -1,
        comment: 'Balance Withdrawal',
      }
    );

    return true;
  }

  async DepositAccount(url: string, connectionID: string, login: number, amount: number) {
    await this.API.Get(
      `${url}/Deposit`,
      {},
      {
        id: connectionID,
        login: login,
        amount: amount,
        comment: 'initial deposit',
      }
    );
    return true;
  }

  async Ping(url: string) {
    await this.API.Get(`${url}/ping`);
    return true;
  }
}

export const mt4Service = new controller(API);
