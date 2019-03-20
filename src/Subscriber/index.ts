// import * as React from "react";

type Component = React.ReactNode;

export type modalPropertiesType = {
  containerStyles: {
    top: string | number;
    left: string | number;
    width: string | number;
    height: string | number;
    backgroundColor?: string;
    borderRadius?: number;
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
  };
  id?: number;
  onBackdropPress?: Function;
  initialPosition?: string | number;
  dontShowBackdrop?: boolean;
  verticalDirection?: boolean;
  shadow?: number;
};

type onShowModal = (Component: Component, props: modalPropertiesType) => void;
type onHideModal = (id: number) => void;
type onChangeModalPosition = (id: number, position: string | number) => void;
type onStretchModal = (id: number, stretchingValue?: string | number) => void;

interface ISubscriber {
  subscribeShowModal(fn: onShowModal): void;
  showModal(Component: Component, containerStyles?: any): void;
}

class Subscriber implements ISubscriber {
  private onShowModal?: onShowModal;
  private onHideModal?: onHideModal;
  private onStretchModal?: onStretchModal;
  private onChangeModalPosition?: onChangeModalPosition;

  public subscribeShowModal = (fn: onShowModal) => {
    this.onShowModal = fn;
  };

  public subscribeHideModal = (fn: onHideModal) => {
    this.onHideModal = fn;
  };

  public subscribeChangeModalPosition = (fn: onChangeModalPosition) => {
    this.onChangeModalPosition = fn;
  };

  public subscribeStretchModal = (fn: onStretchModal) => {
    this.onStretchModal = fn;
  };

  public showModal = (Component: Component, properties: modalPropertiesType) => {
    if (this.onShowModal) {
      this.onShowModal(Component, properties);
    }
  };

  public changeModalPosition = (id: number, position: number | string) => {
    if (this.onChangeModalPosition) {
      this.onChangeModalPosition(id, position);
    }
  };

  public stretchModal = (id: number, stretchingValue?: string | number) => {
    if (this.onStretchModal) {
      this.onStretchModal(id, stretchingValue);
    }
  };

  public hideModal = (id: number = 0) => {
    if (this.onHideModal) {
      this.onHideModal(id);
    }
  };
}

export default new Subscriber();
