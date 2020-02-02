import React from "react";
import { ViewStyle, StyleSheet, Text } from "react-native";
import moment from "moment";
import { colorTheme } from "src/Themes/Colors";
import { TransparentButton } from "src/Components/Buttons";
import { ChevronDown, ChevronUp, Calendar } from "src/Components/Icons";

type Props = {
  currentDate: Date;
  onPress(): void;
  theme: "dark" | "light";
  style?: ViewStyle;
  isMonthCalendarOpen: boolean;
};

class CurrentMonth extends React.PureComponent<Props> {
  static defaultProps = {
    currentDate: new Date(),
    theme: "light",
  };

  public render() {
    const themeColors = colorTheme[this.props.theme];
    return (
      <TransparentButton
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}
        accessibilityLabel="toggleMonthCalendar">
        <Calendar color={themeColors.defaultText} />
        <Text style={[styles.month, { color: themeColors.defaultText }]}>
          {moment(this.props.currentDate).format("MMMM Y")}
        </Text>
        {this.props.isMonthCalendarOpen ? (
          <ChevronUp color={themeColors.defaultText} />
        ) : (
          <ChevronDown color={themeColors.defaultText} />
        )}
      </TransparentButton>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: undefined,
  },
  month: { marginHorizontal: 8 },
});

export default CurrentMonth;
