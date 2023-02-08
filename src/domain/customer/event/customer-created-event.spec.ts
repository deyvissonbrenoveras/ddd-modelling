import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import CustomerCreatedSecondaryHandler from "./handler/customer-created-secondary.handler";
import CustomerCreatedHandler from "./handler/customer-created.handler";

describe("customer created event tests", () => {
  it("should invoke all customer created handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerCreatedHandler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(1);

    const secondaryEventHandler = new CustomerCreatedSecondaryHandler();
    eventDispatcher.register("CustomerCreatedEvent", secondaryEventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(secondaryEventHandler);
  });

  it("should notify all customer created event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerCreatedHandler();
    const secondarEventHandler = new CustomerCreatedSecondaryHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spySecondaryEventHandler = jest.spyOn(secondarEventHandler, "handle");
    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", secondarEventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(secondarEventHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "1",
      name: "Customer 1",
      active: true,
      rewardPoints: 0,
      address: {
        street: "street 1",
        number: "1",
        city: "city 1",
        zip: "zip code",
      },
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spySecondaryEventHandler).toHaveBeenCalled();
  });
});
