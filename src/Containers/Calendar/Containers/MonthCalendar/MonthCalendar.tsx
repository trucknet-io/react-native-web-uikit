import React from "react";
import { View, StyleSheet, Text, ViewStyle } from "react-native";
import MonthCalendar from "src/Containers/Calendar/Components/MonthCalendar";
import SwitchMonthButtons from "src/Containers/Calendar/Components/SwitchMonthButtons";
import moment from "moment";
import { TransparentButton } from "src/Components/Buttons/TransparentButton";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

interface DefaultProps {
  currentDate: Date;
}
type Styles = ReturnType<typeof getStyles>;
interface Props extends DefaultProps, ThemeProps<Styles> {
  submit: {
    onSubmit(date: Date): void;
    submitLabel?: React.ReactNode;
  };
  cancel: {
    onCancel(): void;
    cancelLabel?: React.ReactNode;
  };
  style?: ViewStyle;
}

type State = {
  currentDate: Date;
};

class MonthCalendarContainer extends React.PureComponent<Props, State> {
  static defaultProps = {
    currentDate: new Date(),
  };

  public state = {
    currentDate: this.props.currentDate,
  };

  public render() {
    const { colors, styles } = this.props;
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.headerContainer}>
          <View style={styles.monthContainer}>
            <Text style={{ color: colors.defaultText }}>{moment(this.state.currentDate).format("LL")}</Text>
          </View>
          <SwitchMonthButtons
            style={styles.switchButtonsContainer}
            currentDate={this.state.currentDate}
            onMonthChange={this.handleDateChange}
          />
        </View>
        <MonthCalendar currentDate={this.state.currentDate} onDayPress={this.handleDateChange} />
        <View style={styles.footerContainer}>
          <TransparentButton
            onPress={this.props.cancel.onCancel}
            style={{ width: undefined }}
            marginHorizontal={8}
            accessibilityLabel="cancel">
            <Text style={{ color: colors.defaultText }}>{this.props.cancel.cancelLabel || "Cancel"}</Text>
          </TransparentButton>
          <TransparentButton onPress={this.handleSubmit} style={{ width: undefined }} accessibilityLabel="submit">
            <Text style={{ color: colors.defaultText }}>{this.props.submit.submitLabel || "Ok"}</Text>
          </TransparentButton>
        </View>
      </View>
    );
  }

  private handleSubmit = () => this.props.submit.onSubmit(this.state.currentDate);
  private handleDateChange = (date: Date) => this.setState({ currentDate: date });
}

const getStyles = ({ colors, variables: { size } }: ThemeParamsType) =>
  StyleSheet.create({
    container: { backgroundColor: colors.background },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      paddingHorizontal: size.calendarPaddingHorizontal,
    },
    monthContainer: { flex: 3 },
    switchButtonsContainer: { flex: 1 },
    footerContainer: {
      flexDirection: "row",
      paddingHorizontal: size.calendarPaddingHorizontal,
      justifyContent: "flex-end",
    },
  });

export default withTheme<Props, DefaultProps>(getStyles)(MonthCalendarContainer);
