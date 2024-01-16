/*
 * ###############################################################################
 * File: iCheatLog.ts
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

export interface iCheatLog {
	date: Date;
	login: number;
	event: string;
	orderNumber?: number;
}
