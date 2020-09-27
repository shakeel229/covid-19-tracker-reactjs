import "./App.css";

import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Map from "./Map";
import InfoBox from "./InfoBox";
import Table from "./Table";
import { sortedData } from "./utils";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("WorldWide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapzoom, setMapzoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  useEffect(async () => {
    await fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries2 = data.map((country) => {
            return { name: country.country, value: country.countryInfo.iso2 };
          });
          setCountries(countries2);
          const sortedList = sortedData(data);
          setTableData(sortedList);
          setMapCountries(data);
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
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapzoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1 className="redColor">COVID 19 TRACKER</h1>
          <FormControl
            className="app_dropdown"
            style={{ backgroundColor: "white" }}
          >
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
            onClick={(e) => setCasesType("cases")}
            isRed={true}
            active={casesType === "cases"}
            title="Coronavirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          ></InfoBox>
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            isRed={false}
            active={casesType === "recovered"}
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          ></InfoBox>
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            active={casesType === "deaths"}
            title="Deaths"
            isRed={true}
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          ></InfoBox>
        </div>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapzoom}
        ></Map>
      </div>
      <Card className="app_right">
        <CardContent>
          <h2>Live Cases By Country</h2>
          <Table countries={tableData}></Table>
          <h2>World Wide New {casesType}</h2>
          <LineGraph casesType={casesType}></LineGraph>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
