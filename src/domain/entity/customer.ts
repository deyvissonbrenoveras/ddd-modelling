import EventDispatcher from "../event/@shared/event-dispatcher";
import EventDispatcherInterface from "../event/@shared/event-dispatcher.interface";
import CustomerAddressChangedEvent from "../event/customer/customer-address-changed.event";
import Address from "./address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  private eventDispatcher: EventDispatcherInterface;

  constructor(
    id: string,
    name: string,
    eventDispatcher: EventDispatcherInterface = new EventDispatcher()
  ) {
    this._id = id;
    this._name = name;
    this.eventDispatcher = eventDispatcher;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  isActive(): boolean {
    return this._active;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
  }

  changeName(name: string) {
    this._name = name;
  }

  changeAddress(address: Address) {
    this._address = address;
    this.eventDispatcher.notify(new CustomerAddressChangedEvent(this));
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set address(address: Address) {
    this._address = address;
  }
}
