import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TransparentButton } from "src/Components/Buttons";
import moment from "moment";
import getShadowStyle from "src/Themes/getShadowStyle";
import Colors from "src/Themes/Colors";
import { ChevronLeft, ChevronRight } from "src/Components/Icons";

interface Props {
  isVisible: Boolean;
  onDayPress(day: Date): void;
  onNextMonthPress?(): void;
  onPreviousMonthPress?(): void;
  currentDate: Date;
}

export type Day = {
  day: string;
  name: string;
  date: Date;
};

class Calendar extends React.PureComponent<Props> {
  static defaultProps = {
    currentDate: new Date(),
  };
  public render() {
    if (!this.props.isVisible) return null;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: "5%" }}>
          <View style={{ flex: 3, paddingVertical: 12 }}>
            <Text>{moment(this.props.currentDate).format("MMMM Y")}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
            <TransparentButton style={{ width: undefined }} onPress={this.props.onPreviousMonthPress}>
              <ChevronLeft color={Colors.defaultText} />
            </TransparentButton>
            <TransparentButton style={{ width: undefined }} onPress={this.props.onNextMonthPress}>
              <ChevronRight color={Colors.defaultText} />
            </TransparentButton>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>{this.renderWeekDayNames()}</View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>{this.renderMonthDayNumbers()}</View>
      </View>
    );
  }

  private renderWeekDayNames = () => {
    const weekDayNames: React.ReactNode[] = [];
    for (let i = 0; i < 7; i++) {
      weekDayNames.push(
        <View style={styles.dayContainer}>
          <Text>
            {moment(this.props.currentDate)
              .startOf("week")
              .add(i, "days")
              .format("dd")}
          </Text>
        </View>,
      );
    }

    return weekDayNames;
  };

  private renderMonthDayNumbers = () => {
    const startDay = moment(this.props.currentDate)
      .startOf("month")
      .startOf("week");

    const days: React.ReactNode[] = [];
    let day = startDay;
    let i = 0;
    while (!day.isAfter(this.props.currentDate, "month")) {
      day = moment(startDay).add(i, "days");
      days.push(
        <TransparentButton style={styles.dayContainer} onPress={this.handleDayPress(day)}>
          {day.isSame(this.props.currentDate, "month") ? <Text>{moment(day).date()}</Text> : null}
        </TransparentButton>,
      );

      i++;
    }
    return days;
  };

  private handleDayPress = (day) => () => this.props.onDayPress(day);
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    borderRadius: 4,
    // padding: 8,
    backgroundColor: Colors.background,
    ...getShadowStyle(12),
  },
  dayContainer: {
    width: `${100 / 7}%`,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
});

export default Calendar;
