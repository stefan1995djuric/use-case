import React, { useEffect, useState } from "react";
import { useIntl } from 'react-intl';
import "./App.scss";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ReactCountryDropdown } from "react-country-dropdown";
import "react-country-dropdown/dist/index.css";
import WeekTemperature from "./components/WeekTemperature";
import { countries } from "./constants";
import {
  getRandTemperatures
} from "./utils/date";
import messages from './messages';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    marginLeft: "30px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function App() {
  const classes = useStyles();
  const { formatMessage } = useIntl();

  const [state, setState] = useState("NL");
  const [cities, setCities] = useState(countries["NL"]);
  const [city, setCity] = useState("");
  const [maxTemp, setMaxTemp] = useState(40);
  const [minTemp, setMinTemp] = useState(-40);
  const [temperatures, setTemperatures] = useState([]);
  const [averageTemp, setAverageTemp] = useState(20);

  const handleSelect = (country) => {
    setState(country.code);
    setCities(countries[country.code] ? countries[country.code] : []);
    setCity("");
  };

  //I used fake temperatures because I don't have a backend
  useEffect(() => {
    const temperatures = getRandTemperatures();
    setTemperatures(temperatures)
    let minTemp = 41;
    let maxTemp = -41;
    let sum = 0;
    for (const randTemp of temperatures) {
      if (randTemp > maxTemp) maxTemp = randTemp;
      if (randTemp < minTemp) minTemp = randTemp;
      sum = sum + randTemp;
    }
    setMaxTemp(maxTemp);
    setMinTemp(minTemp);
    setAverageTemp(sum/10);
  }, [city]);
  

  const handleSelectCity = (e, city) => {
    if (cities.includes(city)) {
      setCity(city);
    } else {
      setCity("");
    }
  };

  return (
    <div
      className="App"
      style={{
        background:
          "linear-gradient(to left top,#ed9a68 " +
          (minTemp + 40) / 0.8 +
          "%, #17317b " +
          (maxTemp + 40) / 0.8 +
          "%)",
      }}
    >
      <div className="form-location">
        <img className="weather" src={"./weather.png"} alt={"weather"}></img>
        <ReactCountryDropdown
          className="country"
          onSelect={handleSelect}
          countryCode="NL"
        />
        <Paper component="form" className={classes.root}>
          <Autocomplete
            id="combo-box"
            options={cities}
            getOptionLabel={(option) => option}
            onInputChange={(e, value) => handleSelectCity(e, value)}
            renderInput={(params) => {
              const { InputLabelProps, InputProps, ...rest } = params;
              return <InputBase {...params.InputProps} {...rest} placeholder={formatMessage(messages.placeholder)}/>;
            }}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      {city && (
        <WeekTemperature
          temperatures={temperatures}
          averageTemp={averageTemp}
        />
      )}
    </div>
  );
}

export default App;
