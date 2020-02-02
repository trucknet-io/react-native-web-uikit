import React from "react";
import { View, StyleSheet, Text, ViewStyle } from "react-native";
import MonthCalendar from "src/Containers/Calendar/Components/MonthCalendar";
import { colorTheme } from "src/Themes/Colors";
import SwitchMonthButtons from "src/Containers/Calendar/Components/SwitchMonthButtons";
import moment from "moment";
import { TransparentButton } from "src/Components/Buttons/TransparentButton";

type Props = {
  currentDate: Date;
  onSubmit(date: Date): void;
  onCancel(): void;
  theme: "dark" | "light";
  style?: ViewStyle;
};

type State = {
  currentDate: Date;
};

class MonthCalendarTablet extends React.PureComponent<Props, State> {
  static defaultProps = {
    currentDate: new Date(),
    theme: "light",
  };

  public state = {
    currentDate: this.props.currentDate,
  };

  public render() {
    const themeColors = colorTheme[this.props.theme];
    const { theme, style } = this.props;
    return (
      <View style={[styles.container, style]} key={this.props.currentDate.toString()}>
        <View style={styles.headerContainer}>
          <View style={styles.monthContainer}>
            <Text style={[{ color: themeColors.defaultText }]}>{moment(this.state.currentDate).format("MMMM Y")}</Text>
          </View>
          <SwitchMonthButtons
            style={styles.switchButtonsContainer}
            theme={theme}
            currentDate={this.state.currentDate}
            onMonthChange={this.handleDateChange}
          />
        </View>
        <MonthCalendar currentDate={this.state.currentDate} theme={theme} onDayPress={this.handleDateChange} />
        <View style={styles.footerContainer}>
          <TransparentButton
            onPress={this.props.onCancel}
            style={{ width: undefined }}
            marginHorizontal={8}
            accessibilityLabel="cancel">
            <Text>Cancel</Text>
          </TransparentButton>
          <TransparentButton onPress={this.handleSubmit} style={{ width: undefined }} accessibilityLabel="submit">
            <Text>Ok</Text>
          </TransparentButton>
        </View>
      </View>
    );
  }

  private handleSubmit = () => this.props.onSubmit(this.state.currentDate);
  private handleDateChange = (date: Date) => this.setState({ currentDate: date });
}

const styles = StyleSheet.create({
  container: { alignItems: "flex-end" },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: "6%",
  },
  monthContainer: { flex: 3 },
  switchButtonsContainer: { flex: 1 },
  footerContainer: { flexDirection: "row", paddingHorizontal: "6%" },
});

export default MonthCalendarTablet;
