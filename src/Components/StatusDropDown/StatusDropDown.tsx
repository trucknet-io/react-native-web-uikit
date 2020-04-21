import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TransparentButton, TransparentButtonProps } from "src/Components/Buttons";
import getShadowStyle from "src/Themes/getShadowStyle";
import { getTransparentColor } from "src/Themes/Colors";
import { TriangleDown, TriangleUp } from "src/Components/Icons";
import withTheme, { ThemeProps, ThemeParamsType } from "src/Themes/withTheme";
import StatusButton, { Status } from "./StatusButton";

interface OwnProps {
  currentStatusKey: Status["key"];
  dropDownStatuses: Status[];
  onStatusPress(statusKey: string): void;
  color: string;
  statusIcon?: React.ReactNode;
}

type Style = ReturnType<typeof getStyles>;

type DropdownTransparentButtonProps = Omit<TransparentButtonProps, "styles">;

interface Props extends OwnProps, ThemeProps<Style>, DropdownTransparentButtonProps {}

interface State {
  isOpen: boolean;
}

export class PureStatusDropDown extends React.PureComponent<Props, State> {
  public state = {
    isOpen: false,
  };
  public render() {
    const { styles, style, currentStatusKey, dropDownStatuses, onStatusPress, color, statusIcon, ...rest } = this.props;
    return (
      <View>
        {this.renderDropDownMenu()}
        <TransparentButton onPress={this.toggleDropDown} style={[styles.container, style]} {...rest}>
          <View style={styles.statusContainer}>
            {statusIcon ? <View style={styles.statusIconContainer}>{statusIcon}</View> : null}
            <Text style={styles.statusLabel}>{this.getCurrentStatus()}</Text>
          </View>
          {this.state.isOpen ? <TriangleUp color={color} /> : <TriangleDown color={color} />}
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

const getStyles = ({ colors, props }: ThemeParamsType<OwnProps>) =>
  StyleSheet.create({
    container: {
      padding: 8,
      borderRadius: 4,
      justifyContent: "space-between",
      backgroundColor: getTransparentColor(props.color),
      flexDirection: "row",
      alignItems: "center",
    },
    statusIconContainer: { marginHorizontal: 4 },
    statusContainer: { flexDirection: "row", alignItems: "center", marginHorizontal: 4 },
    statusLabel: { textTransform: "uppercase", lineHeight: 24, color: props.color },
    dropDownMenuContainer: {
      position: "absolute",
      bottom: "110%",
      width: "98%",
      backgroundColor: colors.background,
      ...getShadowStyle(6),
    },
  });

export default withTheme<Props>(getStyles)(PureStatusDropDown);
