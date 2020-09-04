import axios, { AxiosInstance } from 'axios';
import { Meli } from '../config/config';
import { MeliResponseMapper } from '../helper/MeliResponseMapper';
import { IMeliItem } from 'interfaces/IMeliItem';

export default class MeliService{

    private httpClient:AxiosInstance;

    constructor(){
        this.httpClient = axios.create({baseURL:Meli.baseUri});
    }

    private get(path:string,parameters?:object,options?:any){
        console.log(path,parameters);
        return this.httpClient.get(path,{params:parameters});
    }
    private getCategoriesFromFilters(data:any){
        const categories = data
        .find(filter=> filter.id === "category")
        .values
        .shift()
        .path_from_root
        .map(category=> category.name);
        
        return categories;
    }
    public async getItems(term:string|any,options?:any){
        const data = (await this.get('sites/MLA/search',{q:term})).data;
        let items = data.results.splice(0,options.take || 4);
        let categories = this.getCategoriesFromFilters(data.filters);
        console.log(categories);
        return {items,categories};
    }

    public async getItemDescription(id:String){
        const result = (await this.get(`items/${id}/description`)).data;
        const description:String = result.text ? result.text : result.plain_text;
        return description; 
        //const {}
    }
    public async getItemCategories(categoryId:String){
        const categories:String[] = (await this.get(`categories/${categoryId}`)).data.path_from_root;
        return categories; 
    }
    public async getItem(id:string){
        
        const item:IMeliItem= (await this.get(`items/${id}`)).data;
        item.description = await this.getItemDescription(item.id);
        const categories:String[] = await this.getItemCategories(item.category_id);

        return {item,categories}
    }
}