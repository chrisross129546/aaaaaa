import { tradeModel } from '../models/tradeModel';

export const processData = (orders: tradeModel[]) => {
  let parsedData: { [key: number]: { input: { [key: string]: number }; output: { [key: string]: number } }[] } = {};

  // { input: { [key: string]: number }; output: { [key: string]: number } }

  orders.forEach(({ profit, openTime, volume, symbol, cmd, sl, tp, openPrice }) => {
    const result = profit < 0 ? 0 : 1;

    if (!profit || !symbol || !cmd || !openTime) return;
    const [hour, minute] = new Intl.DateTimeFormat('en-GB', { minute: 'numeric', hour: 'numeric' }).format(new Date(openTime)).split(':');

    const symbols = '0.' + Array.from(symbol.split(''), char => char.charCodeAt(0)).reduce((x, y) => x + y);
    const direction = (() => {
      if (cmd.toLowerCase().includes('stop') || cmd.toLowerCase().includes('limit')) return;

      return (cmd.toLowerCase().includes('buy') ? 1 : 0) as number;
    })() as number | undefined;

    const day = new Date(openTime).getDay();
    sl = Math.abs(sl - openPrice);
    tp = Math.abs(tp - openPrice);

    if (!(parsedData[+cmd] instanceof Array)) parsedData[+cmd] = [];
    else if (direction)
      parsedData[+cmd].push({
        input: {
          symbol: +symbols,
          direction: +direction,
          day,
          sl: sl > 0 ? 1 : 0,
          tp: tp > 0 ? 1 : 0,
          hour: +('0.' + hour),
          minute: +('0.' + minute),
        },
        output: { [result == 1 ? 'win' : 'loss']: result },
      });
  });

  return parsedData;
};
