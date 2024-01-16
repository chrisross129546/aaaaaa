/*
 * ###############################################################################
 * File: email.ts
 * Project: prop-server
 * Created Date: Mon Aug 2023
 * Author: Ryan Beasley
 * -----
 * Last Modified: Mon Aug 28 2023
 * Modified By: Ryan Beasley
 * -----
 * Copyright (c) 2023 Propriotec LTD
 * ###############################################################################
 */
export class Email {
	emailAddress: string;
	bcc?: string;
	subject: string;
	body: string;

	constructor(emailAddress: string, subject: string, body: string, bcc?: string) {
		this.emailAddress = emailAddress;
		this.subject = subject;
		this.body = body;
		this.bcc = bcc;
	}
}
