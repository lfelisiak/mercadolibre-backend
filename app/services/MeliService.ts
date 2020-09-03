import axios, { AxiosInstance } from 'axios';
import { Meli } from '../config/config';
import { MeliResponseMapper } from '../helper/MeliResponseMapper';

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
        let items = data.results.splice(0,options.take || 0);
        let categories = this.getCategoriesFromFilters(data.filters);
        console.log(categories);
        return {items,categories};
    }

    public async getItemDescription(id:string){
        //const {}
    }
    public async getItem(id:string){
        const {result,filters} = (await this.get('item',{id:id})).data; 
    }
}