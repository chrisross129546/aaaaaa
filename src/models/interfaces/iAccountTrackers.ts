/*
 * Filename: /Users/ryanbeasley/Desktop/Programing/Propriotec/new-server/src/models/interfaces/iAccountTrackers
 * Path: /Users/ryanbeasley/Desktop/Programing/Propriotec/new-server
 * Created Date: Saturday, August 26th 2023, 8:41:38 am
 * Author: Ryan Beasley
 *
 * Copyright (c) 2023 Propriotec LTD
 */

export type iAccountTrackers = {
	daily?: iTracker | undefined;
	lifetime?: iTracker | undefined;
	profit?: iTracker | undefined;
};

export interface iTracker {
	name: TrackerName;
	options: 'relative' | 'absolute';
	type: 'drawdown' | 'profit';
	track: 'Balance' | 'Equity';
	initialBalance: number | 0;
	amount: number;
}
export class Tracker implements iTracker {
	name: TrackerName;
	options: 'relative' | 'absolute';
	type: 'drawdown' | 'profit';
	track: 'Balance' | 'Equity';
	initialBalance: number;
	amount: number;

	constructor(args: {
		name: TrackerName;
		options: 'relative' | 'absolute';
		type: 'drawdown' | 'profit';
		track: 'Balance' | 'Equity';
		initialBalance: number;
		amount: number;
	}) {
		this.name = args.name;
		this.options = args.options;
		this.type = args.type;
		this.track = args.track;
		this.initialBalance = args.initialBalance;
		this.amount = args.amount;
	}
}
type TrackerName = 'daily' | 'lifetime' | 'profit';
