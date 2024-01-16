/*
 * ###############################################################################
 * File: ruleSettings.ts
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

export interface iRuleSettings {
	copyTrading: { enabled: boolean; type: string; threshold: string };
	ea: { enabled: boolean; type: string };
	hedging: { enabled: boolean; type: string; threshold: number };
	maxLots: { enabled: boolean; amount: number; type: string };
	news: { enabled: boolean; type: string; threshold: number };
	stopLoss: { enabled: boolean; type: string };
	weekend: { enabled: boolean; type: string };
	timeLimits: { enabled: boolean };
	timeStopped: { enabled: boolean; amount: number };
	minTrading: { enabled: boolean; amount: number };
}
