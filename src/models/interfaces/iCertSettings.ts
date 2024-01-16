/*
 * ###############################################################################
 * File: certSettings.ts
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

/**
 *  This software can't be used for resale or distribution. Modification for own use is allowed with prior agreement.
 *
 * NO LICENSE
 *
 * @summary Certificate Settings
 * @author Ryan Beasley - support@propriotec.com
 *
 * Created at     : 2023-05-16 14:33:49
 * Last modified  : 2023-05-16 14:33:49
 */

export interface iCertSettings {
	pass: {
		width: number;
		height: number;
		textPosX: number;
		textPosY: number;
		fontColor: string;
		fontSize: string;
		certUrl: string;
		datePosX: number;
		datePosY: number;
		dateFontSize: string;
	};
	withdraw: {
		url: string;
		qrSize: number;
		qrPosX: number;
		qrPosY: number;
		width: number;
		height: number;
		textPosX: number;
		textPosY: number;
		datePosX: number;
		datePosY: number;
		fontColor: string;
		fontSize: string;
		certUrl: string;
		amountPosX: number;
		amountPosY: number;
		amountFontSize: string;
		sizePosX: number;
		sizePosY: number;
		sizeFontSize: string;
		dateFontSize: string;
	};
}
