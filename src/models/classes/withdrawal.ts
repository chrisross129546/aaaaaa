/*
 * ###############################################################################
 * File: withdrawal.ts
 * Project: prop-server
 * Created Date: Sat Aug 2023
 * Author: Ryan Beasley
 * -----
 * Last Modified: Thu Sep 07 2023
 * Modified By: Ryan Beasley
 * -----
 * Copyright (c) 2023 Propriotec LTD
 * ###############################################################################
 */

export class Withdrawal {
	_id?: string;
	date: Date;
	email: string;
	login: number;
	amount: number;
	method: string;
	wallet?: string;
	network?: string;
	status: 'pending' | 'approved' | 'declined';
	certificate?: string;
	profitSplit: number;
	accountType: string;
	accountSize: number;

	constructor(args: {
		login: number;
		amount: number;
		email: string;
		status: 'pending' | 'approved' | 'declined';
		method: string;
		wallet?: string;
		network?: string;
		profitSplit: number;
		accountType: string;
		accountSize: number;
	}) {
		this.amount = args.amount;
		this.email = args.email;
		this.login = args.login;
		this.date = new Date();
		this.status = args.status;
		this.method = args.method;
		this.wallet = args.wallet;
		this.network = args.network;
		this.profitSplit = args.profitSplit;
		this.accountType = args.accountType;
		this.accountSize = args.accountSize;
	}
}
