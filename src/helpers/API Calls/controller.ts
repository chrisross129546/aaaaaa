/*
 * ###############################################################################
 * File: controller.ts
 * Project: prop-server
 * Created Date: Sat Aug 2023
 * Author: Ryan Beasley
 * -----
 * Last Modified: Thu Aug 31 2023
 * Modified By: Ryan Beasley
 * -----
 * Copyright (c) 2023 Propriotec LTD
 * ###############################################################################
 */

import axios, { Axios } from 'axios';
import { iAPI } from '../../models/interfaces/iAPI';

//Change Error
export class controller implements iAPI {
  HTTP: Axios;
  constructor(HTTP: Axios) {
    this.HTTP = HTTP;
  }
  Get(url: string, headers?: { [key: string]: string }, params?: { [key: string]: any }) {
    return this.HTTP.get(url, {
      params: params,
      headers: {
        ...headers,
      },
    });
  }
  Post(url: string, body?: { [key: string]: any }, headers?: { [key: string]: string }, params?: { [key: string]: any }) {
    return this.HTTP.post(url, body, {
      params: params,
      headers: {
        ...headers,
      },
    });
  }
  Put(url: string, body?: { [key: string]: any }, headers?: { [key: string]: string }, params?: { [key: string]: any }) {
    return this.HTTP.put(url, body, {
      params: params,
      headers: {
        ...headers,
      },
    });
  }
  Delete(url: string, body?: object, headers?: { [key: string]: string }, params?: { [key: string]: any }) {
    return this.HTTP.delete(url, {
      params: params,
      headers: {
        ...headers,
      },
      data: body,
    });
  }
}

export const API = new controller(axios);
