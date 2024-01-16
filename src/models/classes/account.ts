/*
 * ###############################################################################
 * File: account.ts
 * Project: prop-server
 * Created Date: Sat Aug 2023
 * Author: Ryan Beasley
 * -----
 * Last Modified: Tue Sep 05 2023
 * Modified By: Ryan Beasley
 * -----
 * Copyright (c) 2023 Propriotec LTD
 * ###############################################################################
 */

import { iAccountTrackers } from '../interfaces/iAccountTrackers';
import { iAccountType } from '../interfaces/iAccountType';
import { iCheatLog } from '../interfaces/iCheatLog';
import { iCoupon } from '../interfaces/iCoupon';
import { iMetaServer } from '../interfaces/iMetaServer';
import { iPhases } from '../interfaces/iPhases';
import { iPlatform } from '../interfaces/iPlatform';
import { iStatus } from '../interfaces/iStatus';
import { statisticsModel } from './statisticsModel';

export class Account {
	live: boolean;
	name: string;
	login: number;
	password: string;
	investorPassword: string;
	email: string;
	accountType: iAccountType;
	phase: iPhases;
	platform: iPlatform;
	initialBalance: number;
	trackers: iAccountTrackers;
	status: iStatus;
	server: iMetaServer;
	balance: number;
	equity: number;
	startDate: Date;
	endDate: Date | undefined;
	metaServer: string;
	log: iCheatLog[];
	margin: number;
	freeMargin: number;
	profit: number;
	serverID: number;
	orderNumber: any;
	profitSplit: number[] | number;
	timeLimit: number;
	broker: string;
	kyc?: 'pending' | 'complete' | 'rejected';
	contract?: 'pending' | 'sent' | 'complete';
	liveCreated?: 'pending' | 'complete';
	eventFired?: boolean;
	nextStage?: number;
	aBook?: boolean;
	tradingDays: number;
	statistics?: statisticsModel;
	ipAddress?: string[];
	loginIP?: { date: Date; ip: number }[];
	scaled?: number;
	swapFree: boolean;
	withdrawalPeriod: number[];
	coupon?: iCoupon | void;
	addons: string[];
	firstTrade?: Date;
	nextWithdrawal?: Date;

	constructor(args: {
		phase: iPhases;
		trackers: any;
		server: iMetaServer;
		accountType: iAccountType;
		orderNumber: any;
		login: number;
		platform: iPlatform;
		password: string;
		initialBalance: number;
		name: string;
		metaServer: string;
		live: boolean;
		email: string;
		investorPassword: string;
		status: iStatus;
		serverID: number;
		profitSplit: number | number[];
		timeLimit: number;
		broker: string;
		swapFree: boolean;
		coupon?: iCoupon | void;
		withdrawalPeriod: number[];
		addons: string[];
	}) {
		this.live = args.live;
		this.name = args.name;
		this.login = args.login;
		this.password = args.password;
		this.investorPassword = args.investorPassword;
		this.email = args.email;
		this.accountType = args.accountType;
		this.orderNumber = args.orderNumber;
		this.phase = args.phase;
		this.platform = args.platform;
		this.initialBalance = args.initialBalance;
		this.trackers = args.trackers;
		this.server = args.server;
		this.status = args.status;
		this.balance = args.initialBalance;
		this.equity = args.initialBalance;
		this.startDate = new Date();
		this.metaServer = args.metaServer;
		this.log = [];
		this.aBook = false;
		this.serverID = args.serverID;
		this.eventFired = false;
		this.profitSplit = args.profitSplit;
		this.timeLimit = args.timeLimit;
		this.margin = 0;
		this.freeMargin = 0;
		this.profit = 0;
		this.broker = args.broker;
		this.tradingDays = 0;
		this.swapFree = args.swapFree;
		this.coupon = args.coupon;
		this.withdrawalPeriod = args.withdrawalPeriod;
		this.addons = args.addons;
	}
}
