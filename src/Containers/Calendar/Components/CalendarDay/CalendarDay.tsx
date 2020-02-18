import moment from "moment";
import React from "react";
import { Text, StyleSheet } from "react-native";
import { TransparentButton, TransparentButtonProps } from "src/Components/Buttons";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type Styles = ReturnType<typeof getStyles>;

interface DefaultProps {
  fontSize: number;
  type: "month" | "week";
}

type ButtonProps = Omit<TransparentButtonProps, keyof ThemeProps>;

interface OwnProps extends DefaultProps {
  currentDate: Date;
  day: Date;
  onDayPress(date: Date): void;
}

interface Props extends ThemeProps<Styles>, OwnProps, ButtonProps {}

class CalendarDay extends React.PureComponent<Props> {
  static defaultProps: DefaultProps = {
    type: "month",
    fontSize: 14,
  };
  public render() {
    const { day, type, styles, ...rest } = this.props;
    return (
      <TransparentButton style={styles.dayContainer} onPress={this.handleDayPress} {...rest}>
        {moment(day).isSame(this.props.currentDate, type) ? (
          <Text style={styles.day}>{new Date(day).getDate()}</Text>
        ) : null}
      </TransparentButton>
    );
  }

  private handleDayPress = () => {
    this.props.onDayPress(this.props.day);
  };
}

const getStyles = ({ props, colors, variables: { size } }: ThemeParamsType<OwnProps>) => {
  const getDayBackgroundColor = (props: OwnProps) => {
    const day = moment(props.day);
    if (day.isSame(props.currentDate, "day")) {
      return colors.defaultText;
    }
    if (day.isSame(moment(), "day")) {
      return colors.palette.veryLightGray;
    }

    return;
  };

  const getDayTextColor = (props: OwnProps) => {
    const day = moment(props.day);
    if (day.isSame(props.currentDate, "day")) {
      return colors.background;
    }
    if (day.isSame(moment(), "day")) {
      return colors.background;
    }

    return colors.defaultText;
  };
  return StyleSheet.create({
    dayContainer: {
      flexBasis: `${100 / 7}%`,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: size.s,
    },
    day: {
      textAlign: "center",
      minWidth: props.fontSize * 2,
      minHeight: props.fontSize * 2,
      lineHeight: props.fontSize * 2,
      borderRadius: props.fontSize,
      fontSize: props.fontSize,
      backgroundColor: getDayBackgroundColor(props),
      color: getDayTextColor(props),
    },
  });
};
export default withTheme<Props, DefaultProps>(getStyles)(CalendarDay);
