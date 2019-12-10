import { NativeTestInstance } from "@testing-library/react-native";
import { act } from "react-test-renderer";

type FindEventHandlerReturn = NativeTestInstance["props"]["eventName"] | NativeTestInstance["props"]["eventHandler"];

const findEventHandler = (element: NativeTestInstance, eventName: string, callsite?: any): FindEventHandlerReturn => {
  const eventHandler = toEventHandlerName(eventName);
  if (typeof element.props[eventHandler] === "function") {
    return element.props[eventHandler];
  } else if (typeof element.props[eventName] === "function") {
    return element.props[eventName];
  }

  if (element.parent === null || element.parent.parent === null) {
    throw new Error(`No handler function found for event: "${eventName}"`);
  }
  // @ts-ignore
  return findEventHandler(element.parent, eventName, callsite);
};

const invokeEvent = (element: NativeTestInstance, eventName: string, callsite?: any, ...data: any[]) => {
  const handler = findEventHandler(element, eventName, callsite);

  if (!handler) {
    return null;
  }

  let returnValue;

  act(() => {
    returnValue = handler(...data);
  });

  return returnValue;
};

const toEventHandlerName = (eventName: string) => `on${eventName.charAt(0).toUpperCase()}${eventName.slice(1)}`;
const pressHandler = (element: NativeTestInstance) => invokeEvent(element, "press", pressHandler);
const changeTextHandler = (element: NativeTestInstance, ...data: any[]) =>
  invokeEvent(element, "changeText", changeTextHandler, ...data);
const scrollHandler = (element: NativeTestInstance, ...data: {}[]) =>
  invokeEvent(element, "scroll", scrollHandler, ...data);

const fireEvent = (element: NativeTestInstance, eventName: string, ...data: any[]) =>
  invokeEvent(element, eventName, fireEvent, ...data);

fireEvent.press = pressHandler;
fireEvent.changeText = changeTextHandler;
fireEvent.scroll = scrollHandler;

export default fireEvent;
