import * as React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { COUNTRIES_DATA } from "./countries";
import CountriesToPick from "./CountriesToPick";
import FlagWindow from "./FlagWindow";

interface PhoneInputProps {
  handleSubmit?: () => void;
}

export class PhoneInput extends React.PureComponent<PhoneInputProps> {
  state = {
    editable: false,
    isModalOpen: false,
    countryCode: COUNTRIES_DATA[0].code,
    countryFlag: COUNTRIES_DATA[0].flag,
  };

  render() {
    return (
      <View style={style.container}>
        <View style={style.field}>
          <View style={{ flexDirection: "column" }}>
            <TouchableOpacity onPress={() => this.setState({ isModalOpen: !this.state.isModalOpen })}>
              <FlagWindow size={"small"} image={this.state.countryFlag} />
            </TouchableOpacity>
            <View>{this.renderCountryModal()}</View>
          </View>
          <Text>{this.state.countryCode}</Text>
          <TouchableOpacity onPress={this.editField}>
            <TextInput
              style={style.textInput}
              keyboardType="numeric"
              editable={this.state.editable}
              ref={"textInput"}
              onEndEditing={this.submitEditing}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderCountryModal = () => {
    if (!this.state.isModalOpen) return <View />;
    return <CountriesToPick handlePick={this.handlePick} />;
  };

  handlePick = (code: string, flag: string) => {
    this.setState({
      countryCode: code,
      countryFlag: flag,
      isModalOpen: false,
    });
  };

  submitEditing = () => {
    if (this.props.handleSubmit) {
      this.props.handleSubmit();
      this.setState({ editable: false });
    } else {
      this.setState({ editable: false });
    }
  };

  editField = () => {
    this.setState({ editable: true }, () => this.refs.textInput);
  };
}

const style = StyleSheet.create({
  container: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    borderRadius: 5,
  },
  field: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
  },
  picker: {
    flex: 0.3,
  },
  content: {
    flex: 0.65,
    flexDirection: "row",
    alignItems: "center",
  },
});
