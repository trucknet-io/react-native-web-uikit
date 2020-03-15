import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import StatusDropDown, { PureStatusDropDown } from "./StatusDropDown";
import colors from "src/Themes/Colors";
import { Truck, Breakfast } from "src/Components/Icons";
import { View } from "react-native";
import { action } from "@storybook/addon-actions";
import { StyleSheet } from "react-native";

const stories = storiesOf("StatusDropDown", module).addParameters({ component: PureStatusDropDown });

const statuses = [
  { value: "On The Way", key: "onWay" },
  { value: "On a Break", key: "onBreak" },
  { value: "Broken", key: "broken" },
];

stories.add("StatusDropDown on the way", () => (
  <View style={styles.container}>
    <StatusDropDown
      color={colors.themeColor}
      currentStatusKey={statuses[0].key}
      statusIcon={<Truck color={colors.themeColor} width={34} height={18} />}
      dropDownStatuses={statuses}
      onStatusPress={action("onStatusPress")}
    />
  </View>
));

stories.add("StatusDropDown on a break", () => (
  <View style={styles.container}>
    <StatusDropDown
      color={colors.palette.dodgerBlue}
      currentStatusKey={statuses[1].key}
      statusIcon={<Breakfast color={colors.palette.dodgerBlue} width={18} height={18} />}
      dropDownStatuses={statuses}
      onStatusPress={action("onStatusPress")}
    />
  </View>
));

stories.add("StatusDropDown broken", () => (
  <View style={styles.container}>
    <StatusDropDown
      color={colors.palette.torchRed}
      currentStatusKey={statuses[2].key}
      dropDownStatuses={statuses}
      onStatusPress={action("onStatusPress")}
    />
  </View>
));

const styles = StyleSheet.create({
  container: { height: 300, justifyContent: "flex-end" },
});
export { stories };
