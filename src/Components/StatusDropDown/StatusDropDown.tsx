import React from "react";
import { StyleSheet, Text, ViewStyle, View } from "react-native";
import { TransparentButton } from "src/Components/Buttons";
import getShadowStyle from "src/Themes/getShadowStyle";
import { getTransparentColor } from "src/Themes/Colors";
import { Point, TriangleDown, TriangleUp } from "src/Components/Icons";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";

type Status = { key: string; value: React.ReactNode };

interface OwnProps {
  currentStatus: Status;
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
        <TransparentButton
          onPress={this.toggleDropDown}
          style={[styles.container, { backgroundColor: getTransparentColor(this.props.color) }, this.props.style]}>
          <View style={styles.statusContainer}>
            <Point color={this.props.color} width={6} height={6} />
            <View style={styles.statusIconContainer}>{this.props.statusIcon}</View>
            <Text style={[styles.statusLabel, { color: this.props.color }]}>{this.props.currentStatus.value}</Text>
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

  private renderDropDownMenu = () => {
    if (!this.state.isOpen) return null;
    const { styles, colors } = this.props;
    return (
      <View style={styles.dropDownMenuContainer}>
        {this.props.dropDownStatuses.map((status) => {
          const isCurrentStatus = status.key === this.props.currentStatus.key;
          return (
            <TransparentButton
              style={[
                styles.dropDownButton,
                {
                  backgroundColor: isCurrentStatus ? colors.shadow : colors.background,
                },
              ]}
              disabled={isCurrentStatus}
              key={status.key}
              onPress={this.handleStatusPress(status.key)}>
              <Text style={styles.statusValue}>{status.value}</Text>
            </TransparentButton>
          );
        })}
      </View>
    );
  };

  private handleStatusPress = (statusKey: string) => () => {
    this.toggleDropDown();
    this.props.onStatusPress(statusKey);
  };
  private toggleDropDown = () => this.setState({ isOpen: !this.state.isOpen });
}

const getStyles = ({ colors, variables }: ThemeParamsType) =>
  StyleSheet.create({
    container: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 4,
      justifyContent: "space-between",
      ...variables.shadow,
    },
    statusIconContainer: { marginHorizontal: 8 },
    statusContainer: { flexDirection: "row", alignItems: "center" },
    statusLabel: { textTransform: "uppercase", lineHeight: 24, color: colors.defaultText },
    statusValue: { color: colors.defaultText },
    dropDownMenuContainer: {
      position: "absolute",
      bottom: "110%",
      width: "98%",
      backgroundColor: colors.background,
      ...getShadowStyle(6),
    },
    dropDownButton: {
      alignItems: "flex-start",
      justifyContent: "flex-start",
      borderRadius: 0,
      marginHorizontal: 0,
      paddingHorizontal: 16,
    },
  });

export default withTheme<Props>(getStyles)(PureStatusDropDown);
