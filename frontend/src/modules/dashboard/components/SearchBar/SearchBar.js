import { useGlobalSWR } from 'lib/comms_v2/useGlobalSWR';
import { compileGetCurrenciesListAction } from '../../actionCreators';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

type Props = {
  setCurrency: () => void,
  originalSelectedCurrency: string,
};

const SearchBar = (props: Props) => {
  const { originalSelectedCurrency, setCurrency } = props;
  const currencies = useGlobalSWR(compileGetCurrenciesListAction());

  const [options, setOptions] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(originalSelectedCurrency);

  useEffect(() => {
    currencies.data && currencies.data.length && setOptions(currencies.data);
  }, [currencies.data]);

  const onSearchSelectionChange = (event, value) => {
    setSelectedCurrency(value.currencySymbol);
  };

  const onSearchClick = () => {
    console.log(selectedCurrency);
    setCurrency(selectedCurrency);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          top: 0,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Dashboard
          </Typography>
          <Box sx={{ marginY: 1 }}>
            <Autocomplete
              disableClearable
              disablePortal
              options={options}
              sx={{
                marginLeft: 4,
                width: '50vw',
              }}
              onChange={onSearchSelectionChange}
              getOptionLabel={(option) => (option.name ? option.name : option.currencySymbol)}
              // renderOption={(option) => (option.name ? option.name : option.currencySymbol)}
              renderInput={(params) => (
                <Grid container>
                  <Grid item xs={9}>
                    <TextField {...params} type={'text'} label="Select Currency" />
                  </Grid>
                  <Grid item xs={3}>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={onSearchClick}
                      edge="end"
                      sx={{
                        height: '100%',
                        marginY: 'auto',
                      }}
                    >
                      <SearchOutlined />
                    </IconButton>
                  </Grid>
                </Grid>
              )}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchBar;
