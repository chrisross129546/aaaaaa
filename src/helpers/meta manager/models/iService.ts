/*
 * ###############################################################################
 * File: iService.ts
 * Project: prop-server
 * Created Date: Sat Aug 2023
 * Author: Ryan Beasley
 * -----
 * Last Modified: Sun Aug 27 2023
 * Modified By: Ryan Beasley
 * -----
 * Copyright (c) 2023 Propriotec LTD
 * ###############################################################################
 */

import WebSocket from 'ws';
import { Account } from '../../../models/classes/account';
import { UserInfo } from '../../../models/interfaces/UserInfo';
import { iAccountSummary } from '../../../models/interfaces/iAccountSummary';
import { iManagerLogin } from '../../../models/interfaces/iManagerLogin';
import { iMetaAccount } from '../../../models/interfaces/iMetaAccount';
import { iTrade } from '../../../models/interfaces/iTrade';

export interface iService {
  Connect(url: string, details: iManagerLogin): Promise<string>;
  StartEquitySocket(url: string, connectionID: string): Promise<WebSocket>;
  StartTradeSocket(url: string, connectionID: string): Promise<WebSocket>;
  GetAllTrades(url: string, connectionID: string, login: number): Promise<iTrade[]>;
  GetOpenTrades(url: string, connectionID: string, login: number): Promise<iTrade[]>;
  OpenTrade(url: string, connectionID: string, login: number, order: { Cmd: string; Volume: number; Symbol: string }): Promise<number>;
  CloseTrade(url: string, connectionID: string, order: number): Promise<iTrade[]>;
  GetAllAccountSummary(url: string, connectionID: string, login?: number): Promise<iAccountSummary[]>;
  GetAllAccountDetails(url: string, connectionID: string): Promise<any>;
  GetAccountDetails(login: number, url: string, connectionID: string): Promise<any>;
  GetAllAccounts(url: string, connectionID: string): Promise<number[]>;
  GetOnline(url: string, connectionID: string): Promise<any>;
  EnableAccount(account: Account, url: string, connectionID: string): Promise<boolean>;
  DeleteAccount(account: Account, url: string, connectionID: string): Promise<boolean>;
  DisableAccount(account: Account, url: string, connectionID: string): Promise<boolean>;
  WithdrawAccount(url: string, connectionID: string, login: number, amount: number): Promise<boolean>;
  DepositAccount(url: string, connectionID: string, login: number, amount: number): Promise<boolean>;
  Ping(url: string): Promise<boolean>;
  TradeJournal(url: string, connectionID: string, to: Date, from: Date, filter: any): Promise<any>;
  Health(url: string, connectionID: string): Promise<'Connected' | 'Not Connected'>;
  ResetPassword(url: string, connectionID: string, login: number, password: string): Promise<boolean>;
}
