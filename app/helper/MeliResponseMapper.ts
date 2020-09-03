import { IMeliItem } from "../interfaces/IMeliItem";
import { IMeliAuthor } from "../interfaces/IMeliAuthor";
import {Author} from "../config/config";
import { countDecimals } from "./MathHelper";

export const MeliResponseMapper:any = (data:any) =>{
    const items = data.items.map(MeliItemsMapper)
    const categories = data.categories;
    const author:IMeliAuthor = {
        name: Author.name,
        lastname: Author.lastname
    };
    return {author,categories,items}
}

export const MeliItemsMapper:any = (data:[]) =>{
    if (Array.isArray(data)) {
        return data.map(MeliItemMapper);
    }else{
        return MeliItemMapper(data);
    }
}
export const MeliItemMapper:any = (data:any) =>{

    const result:IMeliItem = {
        id:data.id,
        title:data.title,
        price:{
            currency:data.currency_id,
            amount: data.price,
            decimals:countDecimals(data.price)
        },
        picture:data.thumbnail,
        condition: data.condition,
        free_shipping: data.shipping.free_shipping
    }
    return result;
}