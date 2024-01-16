import { LogError } from 'concurrently';
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
    const res = await this.API.Get(
      `${url}/UserPasswordChange`,
      {},
      {
        id: connectionID,
        login,
        type: 'USER_PASS_MAIN',
        password,
      }
    );

    if (res.status !== 200) throw new Error(res.message);
    else return true;
  }

  async OpenTrade(url: string, connectionID: string, login: number, order: { Cmd: string; Volume: number; Symbol: string }): Promise<number> {
    const { data } = await this.API.Get(
      `${url}/OrderSend`,
      {},
      {
        id: connectionID,
        login,
        symbol: order.Symbol,
        lots: (order.Volume / 100).toFixed(2),
        operation: order.Cmd.toUpperCase(),
        sl: 0,
        tp: 0,
      }
    );
    return data.order;
  }

  async Health(url: string, connectionID: string): Promise<'Connected' | 'Not Connected'> {
    const { data } = await this.API.Get(
      `${url}/Health/`,
      {},
      {
        id: connectionID,
      }
    );
    return data;
  }

  async TradeJournal(url: string, connectionID: string, to: Date, from: Date, filter: any): Promise<any> {
    const { data } = await this.API.Get(
      `${url}/TradeJournal/`,
      {},
      {
        id: connectionID,
        to: to,
        from: from,
        filter: filter,
      }
    );
    return data;
  }

  async Connect(url: string, { user, password, host }: iManagerLogin): Promise<string> {
    const {
      data,
      data: { message },
    } = await this.API.Get(`${url}/Connect?user=${user}&password=${password}&server=${host}`);
    if (typeof data != 'string' || message == 'NoConnect' || message == 'Invalid account' || message == 'BadAccountInfo') throw new Error(message);
    else console.log('Connected to MetaTrader', host);

    return data;
  }

  async StartEquitySocket(url: string, connectionID: string): Promise<WebSocket> {
    const websocket = new WebSocket(`ws://${url.replace('http://', '')}/OnOrderProfit?id=${connectionID}`, undefined);

    websocket.once('open', () => console.log(url, 'Equity Socket Opened'));
    websocket.addEventListener('error', (err: any) => console.log(err));
    websocket.once('close', (err: any) => console.log(err));

    return websocket;
  }

  async StartTradeSocket(url: string, connectionID: string): Promise<WebSocket> {
    const websocket = new WebSocket(`ws://${url.replace('http://', '')}/OnPositionUpdateMT4Format?id=${connectionID}`, undefined);

    websocket.once('open', () => console.log(url, 'Trade Socket Opened'));
    websocket.addEventListener('error', (err: any) => console.log(err));
    websocket.once('close', (err: any) => console.log(err));

    return websocket;
  }

  async GetAllTrades(url: string, connectionID: string, login: number): Promise<iTrade[]> {
    const { data } = await this.API.Get(
      `${url}/PositionHistoryMT4Format/`,
      {},
      {
        id: connectionID,
        login: login,
      }
    );

    return data as iTrade[];
  }

  async GetOpenTrades(url: string, connectionID: string, login: number): Promise<iTrade[]> {
    const { data } = await this.API.Get(
      `${url}/PositionsMT4Format/`,
      {},
      {
        id: connectionID,
        logins: login,
      }
    );
    return data as iTrade[];
  }

  async CloseTrade(url: string, connectionID: string, order: number, comment?: string): Promise<iTrade[]> {
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

  async GetAllAccountSummary(url: string, connectionID: string, login?: number): Promise<any> {
    const { data } = await this.API.Get(
      `${url}/AccountsSummary`,
      {},
      {
        id: connectionID,
        login: login,
      }
    );
    return data;
  }

  async GetAllAccountDetails(url: string, connectionID: string): Promise<any> {
    const { data } = await this.API.Get(
      `${url}/UserDetailsMany/`,
      {},
      {
        id: connectionID,
      }
    );
    return data;
  }

  async GetAccountDetails(login: number, url: string, connectionID: string): Promise<any> {
    const { data } = await this.API.Get(
      `${url}/UserDetails/`,
      {},
      {
        id: connectionID,
        login,
      }
    );
    return data;
  }

  async GetAllAccounts(url: string, connectionID: string): Promise<number[]> {
    const { data } = await this.API.Get(
      `${url}/Accounts/`,
      {},
      {
        id: connectionID,
      }
    );
    return data;
  }

  async GetOnline(url: string, connectionID: string): Promise<number[]> {
    const { data } = await this.API.Get(
      `${url}/AccountsOnline/`,
      {},
      {
        id: connectionID,
      }
    );
    return data;
  }

  async EnableAccount(account: Account, url: string, connectionID: string): Promise<boolean> {
    const { data: accountDetails } = await this.API.Get(
      `${url}/AccountDetails`,
      {},
      {
        id: connectionID,
        login: account.login,
      }
    );

    await this.API.Get(
      `${url}/AccountUpdate`,
      {},
      {
        id: connectionID,
        Name: accountDetails.Name,
        email: account.email,
        login: account.login,
        enabled: true,
        rights: 'USER_RIGHT_EXPERT',
        group: accountDetails.group,
        leverage: accountDetails.leverage,
      }
    );
    return true;
  }

  async DisableAccount(account: Account, url: string, connectionID: string): Promise<boolean> {
    const { data: accountDetails } = await this.API.Get(
      `${url}/AccountDetails`,
      {},
      {
        id: connectionID,
        login: account.login,
      }
    );
    await this.API.Get(
      `${url}/AccountUpdate`,
      {},
      {
        id: connectionID,
        Name: accountDetails.Name,
        email: account.email,
        login: account.login,
        enabled: true,
        rights: 'USER_RIGHT_TRADE_DISABLED',
        group: accountDetails.group,
        leverage: accountDetails.leverage,
      }
    );

    return true;
  }

  async DeleteAccount(account: Account, url: string, connectionID: string): Promise<boolean> {
    await this.API.Get(
      `${url}/AccountDelete`,
      {},
      {
        id: connectionID,
        login: account.login,
      }
    );
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

export const mt5Service = new controller(API);
