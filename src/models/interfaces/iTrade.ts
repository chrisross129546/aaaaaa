/*
 * ###############################################################################
 * File: trades.ts
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

export interface iTrade {
	order: number;
	login: number;
	openTime: string;
	closeTime: string;
	symbol: number;
	cmd: string;
	volume: number;
	openPrice: number;
	sl: number;
	tp: number;
	commission: number;
	closePrice: number;
	profit: number;
	comment: string;
	reason: number;
}
