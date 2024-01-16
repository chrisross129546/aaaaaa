/*
 * ###############################################################################
 * File: order.ts
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

export class Order {
	orderNumber: number;
	date: string;
	accountType: string;
	balance: number;
	name?: string;
	email?: string;
	price?: number;
	coupon?: string;

	constructor(args: { orderNumber: number; name?: string; email?: string; accountType: string; balance: number; price?: number; coupon?: string }) {
		this.orderNumber = args.orderNumber;
		this.date = new Date().toDateString();
		this.coupon = args.coupon;
		this.price = args.price;
		this.name = args.name || '';
		this.email = args.email || '';
		this.accountType = args.accountType;
		this.balance = args.balance;
	}
}
