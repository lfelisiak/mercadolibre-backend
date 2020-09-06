import { IMeliItem } from "../interfaces/IMeliItem";
import { IMeliAuthor } from "../interfaces/IMeliAuthor";
import {Author} from "../config/config";
import { countDecimals } from "./MathHelper";

export const MeliResponseMapper:any = (data:any) =>{
    //Llamamos al prepocesador de items
    let items = MeliItemsMapper(data);
    const categories = data.categories;
    const author:IMeliAuthor = {
        name: Author.name,
        lastname: Author.lastname
    };
    //Solo por propositos de legibilidad, podriamos retornar directamente {author,categories,...()}
    const result = {
        author,
        categories,
        ...( Array.isArray(items) ? {items:items} : {item:items} )
    }
    return result;
}

export const MeliItemsMapper:any = (data:any) =>{
    if (Array.isArray(data.items)) {
        return data.items.map(item => MeliItemMapper(item));
    }else{
        return MeliItemMapper(data.item);
    }
}
export const MeliItemMapper:any = (data:any) =>{
    const result:IMeliItem = {
        id:data.id,
        title:data.title,
        address: {
            state: data.address ? data.address.state_name : data.seller_address.state.name || null,
            city:  data.address ? data.address.city_name  : data.seller_address.city.name  || null
        },
        price:{
            currency:data.currency_id,
            amount: data.price,
            decimals:countDecimals(data.price)
        },
        picture: data.pictures ?  data.pictures.pop().secure_url || data.pictures.pop().url : data.thumbnail,
        condition: data.condition,
        free_shipping: data.shipping.free_shipping,
        ...(data.sold_quantity ? {sold_quantity : data.sold_quantity}: {}),
        ...(data.permalink ? {permalink : data.permalink}: {}),
        ...(data.description && { description: data.description })
    }
    //Utilizando spread operator de 2 maneras distintas para hacer lo mismo en SoldQuantity y Description
    return result;
}