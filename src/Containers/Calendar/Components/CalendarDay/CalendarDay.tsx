import moment from "moment";
import React from "react";
import { Text, StyleSheet } from "react-native";
import { TransparentButton, TransparentButtonProps } from "src/Components/Buttons";
import colors, { colorTheme } from "src/Themes/Colors";

interface Props extends TransparentButtonProps {
  currentDate: Date;
  day: Date;
  onDayPress(date: Date): void;
  theme: "light" | "dark";
  fontSize: number;
  type: "month" | "week";
}

export default class CalendarDay extends React.PureComponent<Props> {
  static defaultProps = {
    type: "month",
    theme: "light",
    fontSize: 14,
  };
  public render() {
    const { day, fontSize, type, ...rest } = this.props;
    return (
      <TransparentButton style={styles.dayContainer} onPress={this.handleDayPress} {...rest}>
        {moment(day).isSame(this.props.currentDate, type) ? (
          <Text
            style={[
              styles.day,
              {
                minWidth: fontSize * 2,
                minHeight: fontSize * 2,
                lineHeight: fontSize * 2,
                borderRadius: fontSize,
                fontSize,
              },
              { backgroundColor: this.getDayBackgroundColor(), color: this.getDayTextColor() },
            ]}>
            {moment(day)
              .date()
              .toString()}
          </Text>
        ) : null}
      </TransparentButton>
    );
  }

  private getDayBackgroundColor = () => {
    const themeColors = colorTheme[this.props.theme];
    const day = moment(this.props.day);
    if (day.isSame(this.props.currentDate, "day")) {
      return themeColors.defaultText;
    }
    if (day.isSame(moment(), "day")) {
      return themeColors.palette.veryLightGray;
    }

    return;
  };

  private getDayTextColor = () => {
    const themeColors = colorTheme[this.props.theme];
    const day = moment(this.props.day);
    if (day.isSame(this.props.currentDate, "day")) {
      return themeColors.background;
    }
    if (day.isSame(moment(), "day")) {
      return themeColors.background;
    }

    return themeColors.defaultText;
  };

  private handleDayPress = () => {
    this.props.onDayPress(this.props.day);
  };
}

const styles = StyleSheet.create({
  dayContainer: {
    flexBasis: `${100 / 7}%`,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  day: {
    textAlign: "center",
    color: colors.subtitle,
  },
});
