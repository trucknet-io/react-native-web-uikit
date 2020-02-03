import moment from "moment";
import React from "react";
import { Text, StyleSheet } from "react-native";
import { TransparentButton, TransparentButtonProps } from "src/Components/Buttons";
import withTheme, { ThemeProps } from "src/Themes/withTheme";

interface DefaultProps {
  fontSize: number;
  type: "month" | "week";
}

interface Props extends DefaultProps, ThemeProps, TransparentButtonProps {
  currentDate: Date;
  day: Date;
  onDayPress(date: Date): void;
}

class CalendarDay extends React.PureComponent<Props> {
  static defaultProps: DefaultProps = {
    type: "month",
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
    const day = moment(this.props.day);
    if (day.isSame(this.props.currentDate, "day")) {
      return this.props.colors.defaultText;
    }
    if (day.isSame(moment(), "day")) {
      return this.props.colors.palette.veryLightGray;
    }

    return;
  };

  private getDayTextColor = () => {
    const day = moment(this.props.day);
    if (day.isSame(this.props.currentDate, "day")) {
      return this.props.colors.background;
    }
    if (day.isSame(moment(), "day")) {
      return this.props.colors.background;
    }

    return this.props.colors.defaultText;
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
  },
});

export default withTheme<Props, DefaultProps>()(CalendarDay);
