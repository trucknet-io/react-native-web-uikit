import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
// tslint:disable-next-line:import-name
import Shimmer from "react-native-shimmer-placeholder";
import { isWeb } from "../../Helpers/platform";
import { colorTheme } from "../../Themes/Colors";

interface Props {
  cards: number;
  margin: string | number;
  cardHeight: number;
  theme: "light" | "dark";
}

interface State {
  colors: typeof colorTheme;
}

class CardsPlaceholder extends React.PureComponent<Props, State> {
  state = {
    colors: colorTheme,
  };
  public static defaultProps = {
    lines: 5,
    margin: 12,
    cardHeight: 250,
    theme: "light",
  };
  public render() {
    const theme = this.state.colors[this.props.theme];
    return (
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        <FlatList
          style={{ width: "100%" }}
          data={this.renderPlaceholderLines()}
          renderItem={this.renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  private renderItem = () => {
    const { margin, cardHeight } = this.props;
    const height = cardHeight;
    if (isWeb) {
      return (
        <Shimmer>
          <rect x="80" y={margin} rx="3" ry="3" width="250" height={height} />
        </Shimmer>
      );
    }
    return <Shimmer autoRun={true} style={[styles.card, { marginVertical: margin, height }]} />;
  };

  private renderPlaceholderLines = () => {
    const placeholderCards: Array<{ card: string }> = [];
    const cards = this.props.cards;
    let i;
    for (i = 0; i < cards; i++) {
      placeholderCards.push({ card: "cardPlaceholder" });
    }
    return placeholderCards;
  };
}

export default CardsPlaceholder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  card: {
    width: "100%",
  },
});
