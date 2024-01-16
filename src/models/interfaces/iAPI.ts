/*
 * ###############################################################################
 * File: iAPI.ts
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

export interface iAPI {
	Get(url: string, headers?: { [key: string]: string }, params?: { [key: string]: any }): Promise<any>;
	Post(url: string, body?: { [key: string]: any }, headers?: { [key: string]: string }, params?: { [key: string]: any }): Promise<any>;
	Put(url: string, body?: { [key: string]: any }, headers?: { [key: string]: string }, params?: { [key: string]: any }): Promise<any>;
	Delete(url: string, body?: object, headers?: { [key: string]: string }, params?: { [key: string]: any }): Promise<any>;
}
