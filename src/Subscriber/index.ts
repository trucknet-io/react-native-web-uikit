type Component = React.ReactNode;

export type IdType = string;

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
  id?: IdType;
  onBackdropPress?: Function;
  initialPosition?: string | number;
  dontShowBackdrop?: boolean;
  verticalDirection?: boolean;
  shadow?: number;
};

type onShowModal = (Component: Component, props: modalPropertiesType) => void;
type onHideModal = (id: IdType) => void;
type onChangeModalPosition = (id: IdType, positionShift: string | number) => void;
type onStretchModal = (id: IdType, stretchingValue?: string | number) => void;

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

  public changeModalPosition = (id: IdType, positionShift: number | string) => {
    if (this.onChangeModalPosition) {
      this.onChangeModalPosition(id, positionShift);
    }
  };

  public stretchModal = (id: IdType, stretchingValue?: string | number) => {
    if (this.onStretchModal) {
      this.onStretchModal(id, stretchingValue);
    }
  };

  public hideModal = (id: IdType = "0") => {
    if (this.onHideModal) {
      this.onHideModal(id);
    }
  };
}

export default new Subscriber();
