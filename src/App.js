import { FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import "./App.css";
import InfoBox from "./InfoBox";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("WorldWide");
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries2 = data.map((country) => {
            return { name: country.country, value: country.countryInfo.iso2 };
          });
          setCountries(countries2);
          // console.log(countries2);
        });
    };
    getCountriesData();
  }, []);
  const onCountrySelection = (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    //console.log("shakeel", countryCode);
  };
  return (
    <div className="App">
      <div className="app_header">
        <h1>COVID 19 TRACKER</h1>
        <FormControl className="app_dropdown">
          <Select
            variant="outlined"
            value={country}
            onChange={onCountrySelection}
          >
            <MenuItem value="WorldWide">WorldWide</MenuItem>
            {countries.map((country) => {
              return <MenuItem value={country.value}>{country.name}</MenuItem>;
            })}
            <MenuItem value="worldwide">worldwide</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="app_stats">
        <InfoBox title="Coronavirus Cases" cases={1000} total={2000}></InfoBox>
        <InfoBox title="Recovered" cases={1000} total={2000}></InfoBox>
        <InfoBox title="Deaths" cases={1000} total={2000}></InfoBox>
      </div>
    </div>
  );
}

export default App;
