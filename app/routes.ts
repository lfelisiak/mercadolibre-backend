import { ItemsController } from "./controllers/ItemsController";

export const Routes:any = [
{
    method: "get",
    prefix: "/api",
    route: "/items",
    controller: ItemsController,
    action: "index",
},
{
    method: "get",
    prefix: "/api",
    route: "/items/:id",
    controller: ItemsController,
    action: "get",
}
];