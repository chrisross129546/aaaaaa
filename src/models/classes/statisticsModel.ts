/**
 *  This software can't be used for resale or distribution. Modification for own use is allowed with prior agreement.
 *
 * NO LICENSE
 *
 * @summary Statistics Model
 * @author Ryan Beasley - support@propriotec.com
 *
 * Created at     : 2023-05-16 14:35:07
 * Last modified  : 2023-05-16 14:35:07
 */

export class statisticsModel {
	profit: number
	trades: number
	balance: number
	dailyGrowth: any[]
	highestBalance: number
	wonTradesPercent: number
	wonTrades: number
	lostTrades: number
	bestTrade: number
	worstTrade: number
	cagr: number
	daysSinceTradingStarted: number
	zScore: number
	sharpeRatio: number
	maxDrawdown: number
	trackers: any
	lots: number
	orders: any[]
	riskReward: number
	averageRiskPercent: number
	holdTime: number
	ea: boolean
	maxLots: number
	gambling: boolean

	constructor(stats: {
		profit: number
		trades: number
		balance: number
		dailyGrowth: any[]
		highestBalance: number
		wonTradesPercent: number
		wonTrades: number
		lostTrades: number
		bestTrade: number
		worstTrade: number
		cagr: number
		daysSinceTradingStarted: number
		zScore: number
		maxDrawdown: number
		sharpeRatio: number
		trackers: any
		lots: number
		orders: any[]
		riskReward: number
		averageRiskPercent: number
		holdTime: number
		ea: boolean
		maxLots: number
		gambling: boolean
	}) {
		this.profit = stats.profit
		this.balance = stats.balance
		this.dailyGrowth = stats.dailyGrowth
		this.bestTrade = stats.bestTrade
		this.cagr = stats.cagr
		this.daysSinceTradingStarted = stats.daysSinceTradingStarted
		this.highestBalance = stats.highestBalance
		this.lostTrades = stats.lostTrades
		this.maxDrawdown = stats.maxDrawdown
		this.orders = stats.orders
		this.sharpeRatio = stats.sharpeRatio
		this.trackers = stats.trackers
		this.trades = stats.trades
		this.lots = stats.lots
		this.wonTrades = stats.wonTrades
		this.wonTradesPercent = stats.wonTradesPercent
		this.worstTrade = stats.worstTrade
		this.riskReward = stats.riskReward
		this.averageRiskPercent = stats.averageRiskPercent
		this.zScore = stats.zScore
		this.holdTime = stats.holdTime
		this.ea = stats.ea
		this.maxLots = stats.maxLots
		this.gambling = stats.gambling
	}
}
