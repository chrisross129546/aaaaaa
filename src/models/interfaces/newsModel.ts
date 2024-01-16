/*
 * ###############################################################################
 * File: newsModel.ts
 * Project: prop-server
 * Created Date: Wed Sep 2023
 * Author: Ryan Beasley
 * -----
 * Last Modified: Wed Sep 20 2023
 * Modified By: Ryan Beasley
 * -----
 * Copyright (c) 2023 Propriotec LTD
 * ###############################################################################
 */

export interface NewsModel {
	title: string;
	country: string;
	date: Date;
	impact: string;
	forecast: string;
	previous: string;
}
