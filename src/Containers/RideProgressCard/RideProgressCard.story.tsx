import * as React from "react";
import { storiesOf } from "@storybook/react-native";
import RideProgressCard from "./RideProgressCard";
import { View, StyleSheet } from "react-native";

const verticalCardStories = storiesOf("Vertical Ride Progress Card", module);
const horizontalCardStories = storiesOf("Horizontal Ride Progress Card", module);
import moment from "moment";

const fakeProps = [
  {
    date: new Date(
      moment()
        .add(-1, "days")
        .toString(),
    ),
    city: "Paris, France",
    address: "84, Ave des Champs-Elisey",
  },
  {
    date: new Date(
      moment()
        .add(1, "days")
        .toString(),
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
    <RideProgressCard origin={fakeProps[2]} destination={fakeProps[2]} />
  </View>
));
verticalCardStories.add("Progress 50%", () => (
  <View style={styles.container}>
    <RideProgressCard origin={fakeProps[0]} destination={fakeProps[1]} />
  </View>
));

verticalCardStories.add("Progress 100%", () => (
  <View style={styles.container}>
    <RideProgressCard origin={fakeProps[3]} destination={fakeProps[3]} />
  </View>
));

horizontalCardStories.add("Progress 0%", () => (
  <View style={styles.container}>
    <RideProgressCard origin={fakeProps[2]} destination={fakeProps[2]} isHorizontal />
  </View>
));

horizontalCardStories.add("Progress 50%", () => (
  <View style={styles.container}>
    <RideProgressCard origin={fakeProps[0]} destination={fakeProps[1]} isHorizontal />
  </View>
));

horizontalCardStories.add("Progress 100%", () => (
  <View style={styles.container}>
    <RideProgressCard origin={fakeProps[3]} destination={fakeProps[3]} isHorizontal />
  </View>
));

horizontalCardStories.add("Progress with extra info", () => (
  <View style={styles.container}>
    <RideProgressCard
      origin={fakeProps[0]}
      destination={fakeProps[1]}
      isHorizontal
      distanceInfo="1000 km"
      timeInfo="8h 44m"
    />
  </View>
));

const styles = StyleSheet.create({
  container: { height: 300 },
});

export { verticalCardStories, horizontalCardStories };
