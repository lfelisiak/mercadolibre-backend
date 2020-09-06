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
    public async getItems(term:string|any,options?:any):Promise<any>{
        const data = (await this.get('sites/MLA/search',{q:term})).data;
        let items = data.results.length ? data.results.splice(0,options.take || 4) : [];
        let categories = data.filters.length ? this.getCategoriesFromFilters(data.filters) : [];
        return {items,categories};
    }

    public async getItemDescription(id:String){
        //Dado que es probable que el item no cuente con una descripcion
        //
        let description:String = null;
        try{
            const result = (await this.get(`items/${id}/description`)).data;
            description = result.text ? result.text : result.plain_text 
        }catch(error){
            console.error("Item does not have a Description",error.message)    
        }
        return description; 
    }
    public async getItemCategories(categoryId:String){
        let categories:String[] = [];
        
        try {
            categories = (await this.get(`categories/${categoryId}`)).data.path_from_root.map(category => category.name);
        } catch (error) {
            console.error(error.message);
        }

        return categories; 
    }
    public async getItem(id:string){
        const item:IMeliItem= (await this.get(`items/${id}`)).data;
        const description = await this.getItemDescription(item.id);
        item.description = description || null;
        const categories:String[] = await this.getItemCategories(item.category_id);
        return {item,categories}
    }
}