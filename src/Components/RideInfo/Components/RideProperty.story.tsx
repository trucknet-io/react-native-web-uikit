import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import RideProperty, { PureRideProperty } from "./RideProperty";
import { View, Text } from "react-native";
import Avatar from "src/Components/Avatar";
import { Phone } from "src/Components/Icons";
import { StyleSheet } from "react-native";
import colors from "src/Themes/Colors";

const stories = storiesOf("Ride|RideProperty", module).addParameters({ component: PureRideProperty });

stories.add("Ride property", () => <RideProperty label="Cargo type">Containers, Grand Cube 40, Pallete</RideProperty>);

export const DriverComponent = () => (
  <React.Fragment>
    <Avatar accessibilityLabel="avatar" name="driver" size="small" />
    <Text>Sam Cooper</Text>
  </React.Fragment>
);

export const CallDriverComponent = () => (
  <View style={styles.callCustomerContainer}>
    <View style={styles.avatarContainer}>
      <DriverComponent />
    </View>
    <Phone color={colors.themeColor} />
  </View>
);

stories.add("Driver Property", () => (
  <RideProperty label="Sender">
    <DriverComponent />
  </RideProperty>
));

stories.add("Driver Property with call button", () => (
  <RideProperty label="Sender">
    <CallDriverComponent />
  </RideProperty>
));

const styles = StyleSheet.create({
  callCustomerContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: { flexDirection: "row", alignItems: "center" },
  licenseContainer: { lineHeight: 28 },
  border: { borderWidth: 2 },
});

export { stories };
