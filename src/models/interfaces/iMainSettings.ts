/*
 * ###############################################################################
 * File: mainSetting.ts
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

import { iTracker } from './iAccountTrackers';
import { iPlatformSettings } from './iPlatformSettings';

/**
 *  This software can't be used for resale or distribution. Modification for own use is allowed with prior agreement.
 *
 * NO LICENSE
 *
 * @summary Main Settings Model
 * @author Ryan Beasley - support@propriotec.com
 *
 * Created at     : 2023-05-16 14:34:18
 * Last modified  : 2023-05-16 14:34:18
 */

interface iPlan {
	[key: string]: {
		leverage: number;
		name: string;
		phases: number;
		trackers: iTracker[][];
		timeLimits: number[];
		profitSplit: number;
	};
}

export interface iMainSettings {
	platforms: { [key: string]: iPlatformSettings };
	bots: {
		news: {
			enabled: boolean;
			url: string;
		};
		certificates: {
			enabled: boolean;
			url: string;
		};
		withDrawalCertificates: {
			enabled: boolean;
			url: string;
		};
	};
	trackReset: string;
	smtp: {
		from: string;
		host: string;
		port: number;
		secure: boolean;
		auth: { user: string; pass: string };
	};
	phasePassAction: string;
	plans: iPlan;
	name: string;
}
