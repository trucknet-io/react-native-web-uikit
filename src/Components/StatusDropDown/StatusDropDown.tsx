import React from "react";
import { StyleSheet, Text, ViewStyle, View } from "react-native";
import { TransparentButton } from "src/Components/Buttons";
import getShadowStyle from "src/Themes/getShadowStyle";
import colors, { getTransparentColor } from "src/Themes/Colors";
import { Point, TriangleDown, TriangleUp } from "src/Components/Icons";

type Status = { key: string; value: React.ReactNode };
interface Props {
  currentStatus: Status;
  dropDownStatuses: Status[];
  onStatusPress(statusKey: string): void;
  color: string;
  style?: ViewStyle;
  statusIcon?: React.ReactNode;
}

interface State {
  isOpen: boolean;
}

class StatusDropDown extends React.PureComponent<Props, State> {
  public state = {
    isOpen: false,
  };
  public render() {
    return (
      <View>
        {this.renderDropDownMenu()}
        <TransparentButton
          onPress={this.toggleDropDown}
          style={[styles.container, { backgroundColor: getTransparentColor(this.props.color) }, this.props.style]}>
          <View style={styles.statusContainer}>
            <Point color={this.props.color} width={6} height={6} />
            <Text style={styles.statusIconContainer}>{this.props.statusIcon}</Text>
            <Text style={[styles.statusText, { color: this.props.color }]}>{this.props.currentStatus.value}</Text>
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
              <Text>{status.value}</Text>
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

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    justifyContent: "space-between",
    ...getShadowStyle(6),
  },
  statusIconContainer: { marginHorizontal: 8 },
  statusContainer: { flexDirection: "row", alignItems: "center" },
  statusText: { textTransform: "uppercase", lineHeight: 24 },
  dropDownMenuContainer: {
    position: "absolute",
    bottom: "110%",
    width: "98%",
    backgroundColor: colors.background,
    ...getShadowStyle(8),
  },
  dropDownButton: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderRadius: 0,
    marginHorizontal: 0,
    paddingHorizontal: 16,
  },
});

export default StatusDropDown;
