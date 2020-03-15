import React from "react";
import { StyleSheet, Text, ViewStyle, View } from "react-native";
import { TransparentButton } from "src/Components/Buttons";
import getShadowStyle from "src/Themes/getShadowStyle";
import { getTransparentColor } from "src/Themes/Colors";
import { Point, TriangleDown, TriangleUp } from "src/Components/Icons";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";
import StatusButton, { Status } from "./StatusButton";

interface OwnProps {
  currentStatusKey: Status["key"];
  dropDownStatuses: Status[];
  onStatusPress(statusKey: string): void;
  color: string;
  style?: ViewStyle;
  statusIcon?: React.ReactNode;
}

type Style = ReturnType<typeof getStyles>;

interface Props extends OwnProps, ThemeProps<Style> {}

interface State {
  isOpen: boolean;
}

export class PureStatusDropDown extends React.PureComponent<Props, State> {
  public state = {
    isOpen: false,
  };
  public render() {
    const { styles } = this.props;
    return (
      <View>
        {this.renderDropDownMenu()}
        <TransparentButton onPress={this.toggleDropDown} style={[styles.container, this.props.style]}>
          <View style={styles.statusContainer}>
            <Point color={this.props.color} width={6} height={6} />
            <View style={styles.statusIconContainer}>{this.props.statusIcon}</View>
            <Text style={[styles.statusLabel, { color: this.props.color }]}>{this.getCurrentStatus()}</Text>
          </View>
          {this.state.isOpen ? (
            <TriangleUp color={this.props.color} width={12} height={12} />
          ) : (
            <TriangleDown color={this.props.color} width={12} height={12} />
          )}
        </TransparentButton>
      </View>
    );
  }

  private getCurrentStatus = () => {
    for (const status of this.props.dropDownStatuses) {
      if (status.key === this.props.currentStatusKey) {
        return status.value;
      }
    }
    return null;
  };

  private renderDropDownMenu = () => {
    if (!this.state.isOpen) return null;
    const { styles } = this.props;
    return (
      <View style={styles.dropDownMenuContainer}>
        {this.props.dropDownStatuses.map((status) => (
          <StatusButton
            isCurrentStatus={status.key === this.props.currentStatusKey}
            value={status.value}
            onStatusPress={this.handleStatusPress(status.key)}
            key={status.key}
          />
        ))}
      </View>
    );
  };

  private handleStatusPress = (statusKey: string) => () => {
    this.toggleDropDown();
    this.props.onStatusPress(statusKey);
  };
  private toggleDropDown = () => this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
}

const getStyles = ({ colors, variables, props }: ThemeParamsType<OwnProps>) =>
  StyleSheet.create({
    container: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
      justifyContent: "space-between",
      backgroundColor: getTransparentColor(props.color),
      flexDirection: "row",
      alignItems: "center",
    },
    statusIconContainer: { marginHorizontal: 8 },
    statusContainer: { flexDirection: "row", alignItems: "center" },
    statusLabel: { textTransform: "uppercase", lineHeight: 24, color: colors.defaultText },
    dropDownMenuContainer: {
      position: "absolute",
      bottom: "110%",
      width: "98%",
      backgroundColor: colors.background,
      ...getShadowStyle(6),
    },
  });

export default withTheme<Props>(getStyles)(PureStatusDropDown);
