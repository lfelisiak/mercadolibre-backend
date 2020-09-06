import {Request,Response} from "express";
import MeliService from "../services/MeliService";
import { MeliResponseMapper } from "../helper/MeliResponseMapper";

export class ItemsController{

    constructor(){}

    async index(request: Request, response: Response) {
        try{
            //para limit offset pagination
            let options:Object;
            options = {
                ...(request.query.take ?  {take: request.query.take} : {}),
            };
            const service = new MeliService();
            if(!request.query.search)
                throw new Error("Missing Parameter: Search.")
            
            const {items,categories} = await service.getItems(request.query.search,options);
            return MeliResponseMapper({items,categories});
        }catch(error){
            console.log(error.message);
            return {code:error.code || 500,message:error.message || null};
        }
    }

    async get(request: Request, response: Response) {
        try{
            if(!request.params.id){
                throw new Error("Missing Parameter: id");
            }
            const id:string = request.params.id;
            const service = new MeliService();
            const res = await service.getItem(id);
            return MeliResponseMapper(res);
        }catch(error){
            return (error.response.data) ? {status:false,code:error.response.status,message:"Resource Not Found"} : 
            {code:error.code || 500,status:false,message:error.message || null}
        }
    }

    
}