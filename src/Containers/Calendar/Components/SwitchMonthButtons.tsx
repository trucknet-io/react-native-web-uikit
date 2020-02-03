import React from "react";
import { View, ViewStyle, StyleSheet } from "react-native";
import moment from "moment";
import { TransparentButton } from "src/Components/Buttons";
import { ChevronLeft, ChevronRight } from "src/Components/Icons";
import withTheme, { ThemeProps } from "src/Themes/withTheme";

interface DefaultProps {
  currentDate: Date;
}

interface Props extends DefaultProps, ThemeProps {
  onMonthChange(date: Date): void;
  style?: ViewStyle;
}

class SwitchMonthButtons extends React.PureComponent<Props> {
  static defaultProps = {
    currentDate: new Date(),
  };

  public render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TransparentButton
          style={{ width: undefined }}
          onPress={this.handlePreviousMonthPress}
          accessibilityLabel="prevMonth">
          <ChevronLeft color={this.props.colors.defaultText} />
        </TransparentButton>
        <TransparentButton
          style={{ width: undefined }}
          onPress={this.handleNextMonthPress}
          accessibilityLabel="nextMonth">
          <ChevronRight color={this.props.colors.defaultText} />
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

export default withTheme<Props, DefaultProps>()(SwitchMonthButtons);
