/*
 * ###############################################################################
 * File: iAccountSummary.ts
 * Project: prop-server
 * Created Date: Sun Aug 2023
 * Author: Ryan Beasley
 * -----
 * Last Modified: Sun Aug 27 2023
 * Modified By: Ryan Beasley
 * -----
 * Copyright (c) 2023 Propriotec LTD
 * ###############################################################################
 */

export interface iAccountSummary {
	login: number;
	balance: number;
	profit: number;
	equity: number;
	margin: number;
	freeMargin: number;
}
