import { Product } from "../../../domain/product/entity/entity-product";
import { ProductGateway } from "../../../domain/product/gateway/gateway-product";
import { Usecase } from "../../usecase";

export type ListProductInputDto = void;

export type ListProductOutputDto = {
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[],
};

export class ListProductUsecase implements Usecase<ListProductInputDto, ListProductOutputDto> {
  private constructor(private readonly productGateway: ProductGateway) {};
  
  public static create(productGateway: ProductGateway) {
    return new ListProductUsecase(productGateway);
  };

  public async execute(input: void): Promise<ListProductOutputDto> {
    const aProducts = await this.productGateway.listProduct();
    const output = this.presentOutput(aProducts);
    return output;
  };

  private presentOutput(products: Product[]): ListProductOutputDto {
    return {
      products: products.map((p) => {
        return {
          id: p.id,
          name: p.name,
          price: p.price,
          quantity: p.quantity,
        };
      })
    };
  };
};