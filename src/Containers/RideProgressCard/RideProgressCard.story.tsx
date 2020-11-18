import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import RideProgressCard from "./RideProgressCard";
import { View, StyleSheet } from "react-native";
import moment from "moment";

const verticalCardStories = storiesOf("Vertical Ride Progress Card", module).addParameters({
  component: RideProgressCard,
});
const horizontalCardStories = storiesOf("Horizontal Ride Progress Card", module).addParameters({
  component: RideProgressCard,
});
const fakeProps = [
  {
    date: new Date(
      moment()
        .add(-1, "days")
        .toDate(),
    ),
    city: "Paris, France",
    address: "84, Ave des Champs-Elisey",
  },
  {
    date: new Date(
      moment()
        .add(1, "days")
        .toDate(),
    ),
    city: "Nantes, France",
    address: "Paran 3, 615 A",
  },
  {
    date: new Date("10/10/3000"),
    city: "Taumatawhakatangi­hangakoauauotamatea­turipukakapikimaunga­horonukupokaiwhen­uakitanatahu , North Island",
    address: "Llanfair­pwllgwyngyll­gogery­chwyrn­drobwll­llan­tysilio­gogo­goch 666, 13 Y",
  },
  {
    date: new Date("10/10/2000"),
    city: "Ibi, Spain",
  },
];

verticalCardStories.add("Progress 0%", () => (
  <View style={styles.container}>
    <RideProgressCard
      origin={fakeProps[2]}
      destination={fakeProps[2]}
      stops={{ amount: 2, stopsPass: 0, intermediatePointsText: ["(2 stops)"] }}
    />
  </View>
));

verticalCardStories.add("Progress 100%", () => (
  <View style={styles.container}>
    <RideProgressCard
      origin={fakeProps[3]}
      destination={fakeProps[3]}
      stops={{
        amount: 3,
        stopsPass: 3,
        intermediatePointsText: ["stop 1", "stop 2 aaa aa yyy"],
      }}
    />
  </View>
));

const styles = StyleSheet.create({
  container: { height: 300 },
});

export { verticalCardStories, horizontalCardStories };
