import moment from "moment";
import React from "react";
import { Text, StyleSheet, View, TextStyle } from "react-native";
import { TransparentButton } from "src/Components/Buttons";
import colors, { colorTheme } from "src/Themes/Colors";

type Props = {
  currentDate: Date;
  day: Date;
  onDayPress(date: Date): void;
  theme: "light" | "dark";
  size: number;
  type: "month" | "week";
  dayNumberFontStyle?: TextStyle;
  dayNameFontsStyle?: TextStyle;
};

export class CalendarDay extends React.PureComponent<Props> {
  static defaultProps = {
    size: 28,
    type: "month",
  };
  public render() {
    const { day, size, type } = this.props;
    return (
      <TransparentButton style={styles.dayContainer} onPress={this.handleDayPress}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {this.renderDayName()}
          {moment(day).isSame(this.props.currentDate, type) ? (
            <Text
              style={[
                styles.day,
                {
                  minWidth: size,
                  minHeight: size,
                  lineHeight: size,
                  borderRadius: size / 2,
                },
                { backgroundColor: this.getDayBackgroundColor(), color: this.getDayTextColor() },
                this.props.dayNumberFontStyle,
              ]}>
              {moment(day).date()}
            </Text>
          ) : null}
        </View>
      </TransparentButton>
    );
  }

  private renderDayName = () => {
    if (!(this.props.type === "week")) return null;
    return <Text style={[styles.day, this.props.dayNameFontsStyle]}>{moment(this.props.day).format("dd")}</Text>;
  };

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

  private handleDayPress = () => this.props.onDayPress(this.props.day);
}

const styles = StyleSheet.create({
  dayContainer: {
    width: `${100 / 7}%`,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  day: {
    textAlign: "center",
    color: colors.subtitle,
  },
});
