import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import moment from "moment";
import { colorTheme } from "src/Themes/Colors";
import { TransparentButton } from "src/Components/Buttons";
import { ChevronLeft, ChevronRight } from "src/Components/Icons";

type Props = {
  currentDate: Date;
  onMonthChange(date: Date): void;
  theme: "dark" | "light";
  style?: ViewStyle;
};

class SwitchMonthButtons extends React.PureComponent<Props> {
  static defaultProps = {
    currentDate: new Date(),
    theme: "light",
  };

  public render() {
    const themeColors = colorTheme[this.props.theme];
    return (
      <View style={[styles.container, this.props.style]}>
        <TransparentButton
          style={{ width: undefined }}
          onPress={this.handlePreviousMonthPress}
          accessibilityLabel="prevMonth">
          <ChevronLeft color={themeColors.defaultText} />
        </TransparentButton>
        <TransparentButton
          style={{ width: undefined }}
          onPress={this.handleNextMonthPress}
          accessibilityLabel="nextMonth">
          <ChevronRight color={themeColors.defaultText} />
        </TransparentButton>
      </View>
    );
  }

  private handlePreviousMonthPress = () => {
    const date = new Date(
      moment(this.props.currentDate)
        .add(-1, "month")
        .startOf("month")
        .toString(),
    );
    this.props.onMonthChange(date);
  };
  private handleNextMonthPress = () => {
    const date = new Date(
      moment(this.props.currentDate)
        .add(1, "month")
        .startOf("month")
        .toString(),
    );
    this.props.onMonthChange(date);
  };
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row", justifyContent: "space-between" },
});

export default SwitchMonthButtons;
