import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../@shared/event-dispatcher";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import CustomerAddressChangedHandler from "./handler/customer-address-changed.handle";

describe("customer address changed event tests", () => {
  it("should notify when address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerAddressChangedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    const customer = new Customer("1", "Customer", eventDispatcher);
    const address = new Address("street", 1, "zip", "city");
    customer.changeAddress(address);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
