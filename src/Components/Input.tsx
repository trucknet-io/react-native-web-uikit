import * as React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

// DEMO VERSION
type InputProps = {
  field: string;
  value: string;
  onChangeText: (value: string) => void;
};

class Input extends React.PureComponent<InputProps> {
  render() {
    const { field, value, onChangeText } = this.props;
    return (
      <View style={styles.container}>
        <Text>{`${field}: `}</Text>
        <TextInput style={{ height: 40 }} placeholder={value} value={value} onChangeText={onChangeText} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Input;
