import React from "react";
import { ViewStyle, StyleSheet, Text } from "react-native";
import moment from "moment";
import { TransparentButton } from "src/Components/Buttons";
import { ChevronDown, ChevronUp, Calendar } from "src/Components/Icons";
import withTheme, { ThemeProps } from "src/Themes/withTheme";

interface DefaultProps {
  currentDate: Date;
}

interface Props extends DefaultProps, ThemeProps {
  onPress(): void;
  style?: ViewStyle;
  isMonthCalendarOpen: boolean;
}

class CurrentMonth extends React.PureComponent<Props> {
  static defaultProps = {
    currentDate: new Date(),
  };

  public render() {
    const { colors } = this.props;
    return (
      <TransparentButton
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}
        accessibilityLabel="toggleMonthCalendar">
        <Calendar color={colors.defaultText} />
        <Text style={[styles.month, { color: colors.defaultText }]}>
          {moment(this.props.currentDate).format("MMMM Y")}
        </Text>
        {this.props.isMonthCalendarOpen ? (
          <ChevronUp color={colors.defaultText} />
        ) : (
          <ChevronDown color={colors.defaultText} />
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

export default withTheme<Props, DefaultProps>()(CurrentMonth);
