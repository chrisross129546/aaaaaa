/*
 * ###############################################################################
 * File: user.ts
 * Project: prop-server
 * Created Date: Sat Aug 2023
 * Author: Ryan Beasley
 * -----
 * Last Modified: Sat Aug 26 2023
 * Modified By: Ryan Beasley
 * -----
 * Copyright (c) 2023 Propriotec LTD
 * ###############################################################################
 */

import { Order } from './order';

export class User {
	_id?: string;
	email: string;
	name: string;
	orders: Order[];
	uuid: string | undefined;
	loginSecret: string | undefined;
	loginExpiry: Date | undefined;
	kyc: 'pending' | 'complete' | 'rejected' | 'review' | 'retry' | undefined;
	address: any;
	verifiedData: any;
	password: string | undefined;
	passCertificate: string[];

	constructor(args: {
		_id?: string;
		email: string;
		name: string;
		address?: any;
		orders?: Order[];
		uuid?: string;
		loginSecret?: string;
		loginDate?: Date;
		kyc?: 'pending' | 'complete' | 'rejected' | undefined;
		password?: string;
	}) {
		this._id = args._id;
		this.email = args.email;
		this.name = args.name;
		this.address = args.address;
		this.uuid = args.uuid;
		this.orders = args.orders || [];
		this.loginSecret = args.loginSecret;
		this.loginExpiry = args.loginDate;
		this.kyc = args.kyc || undefined;
		this.password = args.password;
		this.passCertificate = [];
	}
}
