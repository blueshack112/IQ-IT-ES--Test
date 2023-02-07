//@flow
import React, { useEffect, useState } from 'react';
import { compileGetPricePointsListAction } from '../../actionCreators';
import SearchBar from '../SearchBar';
import { apiCaller } from 'lib/comms_v2/apiCaller';
import ChartComponent from '../ChartComponent';

const DashboardPage = () => {
  const [currency, setCurrency] = useState('USD');
  const [pricePoints, setPricePoints] = useState([]);

  const getPricePoints = () => {
    const action = compileGetPricePointsListAction(currency);
    apiCaller(action.payload.path, action)
      .then((response) => {
        console.log('reloaded');
        setPricePoints(response);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPricePoints();
  }, [currency]);

  return (
    <>
      <SearchBar originalSelectedCurrency={currency} setCurrency={setCurrency} />
      <ChartComponent data={pricePoints} currencySymbol={currency} />
    </>
  );
};

export default DashboardPage;
