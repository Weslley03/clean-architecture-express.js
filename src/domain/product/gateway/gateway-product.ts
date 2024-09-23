import { Product } from "../entity/entity-product";

export interface ProductGateway {
  saveProduct(product: Product): Promise<void>;
  listProduct(): Promise<Product[]>;
};