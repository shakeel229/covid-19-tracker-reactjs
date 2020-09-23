import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Map from "./Map";
import "./App.css";
import InfoBox from "./InfoBox";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("WorldWide");
  const [countryInfo, setCountryInfo] = useState({});
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
  const onCountrySelection = async (e) => {
    const countryCode = e.target.value;
    const url =
      countryCode === "WorldWide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };
  console.log("spk", countryInfo);

  return (
    <div className="app">
      <div className="app_left">
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
                return (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="app_stats">
          <InfoBox
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          ></InfoBox>
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          ></InfoBox>
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          ></InfoBox>
        </div>
        <Map></Map>
      </div>
      <Card className="app_right">
        <CardContent>
          <h2>Live Cases By Country</h2>
          <h2>worldWide New Cases</h2>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
