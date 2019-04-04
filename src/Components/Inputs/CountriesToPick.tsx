import * as React from "react";
import FlagWindow from "./FlagWindow";
import { COUNTRIES_DATA } from "./countries";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  handlePick: (code: string, flag: string) => void;
};

export default class CountriesToPick extends React.PureComponent<Props> {
  render() {
    return <View style={style.container}>{this.renderCountry()}</View>;
  }

  renderCountry = () => {
    return COUNTRIES_DATA.map((country) => (
      <View style={style.countryRow}>
        <TouchableOpacity onPress={() => this.props.handlePick(country.code, country.flag)} style={style.countryRow}>
          <FlagWindow size={"small"} image={country.flag} />
          <Text>{country.name}</Text>
          <Text>{country.code}</Text>
        </TouchableOpacity>
      </View>
    ));
  };
}

const style = StyleSheet.create({
  container: {
    width: 150,
    height: 90,
    flexDirection: "column",
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    zIndex: 999,
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    borderRadius: 5,
  },
  countryRow: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
});
