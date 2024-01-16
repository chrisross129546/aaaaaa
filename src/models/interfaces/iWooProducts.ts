export interface iWooProduct {
	id: string;
	accountSize: number;
	platform: string;
	broker: string;
	accountType: string;
	price: number;
}

export class WooProduct implements iWooProduct {
    id: string;
    accountSize: number;
    platform: string;
    broker: string;
    accountType: string;
    price: number;

    constructor(
        id: string,
        accountSize: number,
        platform: string,
        broker: string,
        accountType: string,
        price: number
    ) {
        this.id = id;
        this.accountSize = accountSize;
        this.platform = platform;
        this.broker = broker;
        this.accountType = accountType;
        this.price = price;
    }
}