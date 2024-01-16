/*
 * ###############################################################################
 * File: iPlatformSettings.ts
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

export interface iPlatformSettings {
	enabled: boolean;
	demo: {
		login: number;
		password: string;
		server: string;
		customerServer: string;
		group1: string;
		group2: string;
	};
	live: {
		login: number;
		password: string;
		server: string;
		customerServer: string;
		group: string;
		group2: string;
	};
}
