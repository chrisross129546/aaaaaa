import { database } from '../helpers/database/controller';
import { processData } from './processData';

export const getStatistics = async () => {
  const statistics = await database.Get('newAccounts', { 'statistics.orders': { $exists: true } }, { statistics: 1 }, undefined, 1000);

  let mergedOrders: any = [];

  for (const { statistics: stats } of statistics) {
    mergedOrders = [...mergedOrders, ...stats.orders];
  }

  return processData(mergedOrders);
};
