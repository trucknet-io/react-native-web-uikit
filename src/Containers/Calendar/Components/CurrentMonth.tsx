import * as React from "react";
import { ViewStyle, StyleSheet, Text } from "react-native";
import moment from "moment";
import { TransparentButton } from "src/Components/Buttons";
import { ChevronDown, ChevronUp, Calendar } from "src/Components/Icons";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type Styles = ReturnType<typeof getStyles>;

interface DefaultProps {
  currentDate: Date;
}

interface Props extends DefaultProps, ThemeProps<Styles> {
  onPress(): void;
  style?: ViewStyle;
  isOpen: boolean;
}

class CurrentMonth extends React.PureComponent<Props> {
  static defaultProps = {
    currentDate: new Date(),
  };

  public render() {
    const { colors, styles } = this.props;
    return (
      <TransparentButton
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}
        accessibilityLabel="toggleMonthCalendar">
        <Calendar color={colors.defaultText} />
        <Text style={styles.month}>{moment(this.props.currentDate).format("LL")}</Text>
        {this.props.isOpen ? <ChevronUp color={colors.defaultText} /> : <ChevronDown color={colors.defaultText} />}
      </TransparentButton>
    );
  }
}

const getStyles = ({ colors, variables }: ThemeParamsType) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      width: undefined,
    },
    month: { marginHorizontal: 8, color: colors.defaultText },
  });

export default withTheme<Props, DefaultProps>(getStyles)(CurrentMonth);
