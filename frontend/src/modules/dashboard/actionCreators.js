//@flow
import type { CrudAction } from 'lib/comms_v2/typeDefs';
import { fetchCollection } from 'lib/comms_v2/actionCreators';

export const compileGetPricePointsListAction = (currencySymbol: string = 'USD'): CrudAction =>
  fetchCollection('pricePoints', `pricepoints/pricepoints/?currency=${currencySymbol}`);

export const compileGetCurrenciesListAction = (): CrudAction =>
  fetchCollection('pricePoints', 'pricepoints/currencies');
