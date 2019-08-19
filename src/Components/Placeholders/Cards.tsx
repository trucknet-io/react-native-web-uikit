import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
// tslint:disable-next-line:import-name
import Shimmer from "react-native-shimmer-placeholder";
import { isWeb } from "../../Helpers/platform";
interface IProps {
  cards: number;
  margin: string | number;
  cardHeight: number;
}

class CardsPlaceholder extends React.PureComponent<IProps> {
  public static defaultProps = {
    lines: 5,
    margin: 12,
    cardHeight: 250,
  };
  public render() {
    return (
      <View style={styles.container}>
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
