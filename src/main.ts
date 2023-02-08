import Address from "./domain/customer/value-object/address";
import Customer from "./domain/customer/entity/customer";

let customer = new Customer("123", "Deyvisson Breno");
const address = new Address("Rua dois", 2, "12345-678", "São Paulo");
customer.changeAddress(address);
customer.activate();
