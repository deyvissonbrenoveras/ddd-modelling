import Order from "../entity/order";
import RepositoryInterface from "./repository-interface";

export default interface OrdeRepositoryInterface
  extends RepositoryInterface<Order> {}
