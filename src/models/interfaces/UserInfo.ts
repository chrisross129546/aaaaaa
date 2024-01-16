/*
 * ###############################################################################
 * File: iUserInfo.ts
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

export class UserInfo {
	email: string;
	name: string;
	balance: number;
	leverage: number;
	group: string;

	constructor(email: string, name: string, balance: number, leverage: number, group: string) {
		this.email = email;
		this.name = name;
		this.balance = balance;
		this.leverage = leverage;
		this.group = group;
	}
}
