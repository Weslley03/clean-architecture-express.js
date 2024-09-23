import { PrismaClient } from "@prisma/client";
import { Product } from "../../../../domain/product/entity/entity-product";
import { ProductGateway } from "../../../../domain/product/gateway/gateway-product";

export class ProductRepositoryPrisma implements ProductGateway {
  private constructor(private prismaClient: PrismaClient) {};
  
  public static create(prismaClient: PrismaClient){
    return new ProductRepositoryPrisma(prismaClient);
  }

  public async saveProduct(product: Product): Promise<void> {
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    };
    await this.prismaClient.product.create({data});
  };

  public async listProduct(input: void): Promise<Product[]> {
    const products = await this.prismaClient.product.findMany();
    const productList = products.map((p) => {
      const product = Product.with({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
      });
      return product;
    }); 
    return productList;
  };
};