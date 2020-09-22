import { FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries2 = data.map((country) => {
            return { name: country.country, value: country.countryInfo.iso2 };
          });
          setCountries(countries2);
          console.log(countries2);
        });
    };
    getCountriesData();
  }, []);
  return (
    <div className="App">
      <div className="app_header">
        <h1>COVID 19 TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select variant="outlined" value="abc">
            <MenuItem value="worldwide">worldwide</MenuItem>
            {countries.map((country) => {
              return <MenuItem value={country.value}>{country.name}</MenuItem>;
            })}
            <MenuItem value="worldwide">worldwide</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
