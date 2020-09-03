import {Request,Response} from "express";
import MeliService from "../services/MeliService";
import { MeliResponseMapper } from "../helper/MeliResponseMapper";

export class ItemsController{

    constructor(){}

    async index(request: Request, response: Response) {
        try{
            //for limit offset pagination
            let options:Object;
            options = {
                ...(request.query.take ?  {take: request.query.take} : {}),
            };
            const service = new MeliService();
            if(!request.query.search)
                throw new Error("Missing Parameter: Search.")
            
            const {items,categories} = await service.getItems(request.query.search,options);
            return MeliResponseMapper({items,categories});
            return {items,categories};
        }catch(error){
            console.log(error);
            return {code:error.code || null,message:error.message || null};
        }
    }
/*
    async get(request: Request, response: Response) {
        try{
            const transaction = this.financialAccountHistory.find(transaction => transaction.id === parseInt(request.params.id))
            const result = {code:200,status:true,data:{financialTransaction:transaction}};
            return result;
        }catch(error){
            console.log(error);
            return {code:error.code || 500,status:false,message:error.message || null};
        }
    }

    */
}