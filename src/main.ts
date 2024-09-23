import { ProductRepositoryPrisma } from "./infra/repositories/product/prisma/product-prisma-repository";
import { CreateProductRoute } from "./infra/api/express/routes/product/create-product-express-route";
import { ListProductRoute } from "./infra/api/express/routes/product/list-product-express-route";
import { CreateProductUsecase } from "./usecases/product/create-product/create-product-usecase";
import { ListProductUsecase } from "./usecases/product/list-product/list-product-usecase";
import { ApiExpres } from "./infra/api/express/api.express";
import { prisma } from "./package/prisma/prisma";

function main() {
  const aRepository = ProductRepositoryPrisma.create(prisma);

  const createPrductUsercase = CreateProductUsecase.create(aRepository);
  const listPrductUsercase = ListProductUsecase.create(aRepository);

  const createRoute = CreateProductRoute.create(createPrductUsercase);
  const listRoute = ListProductRoute.create(listPrductUsercase);

  const api = ApiExpres.create([createRoute, listRoute]);

  const port = 8000;
  api.start(port);

};

main();