import moment from "moment";
import { IFinancialAccountTransaction } from "../interfaces/IFinancialAccountTransaction";

export class FinancialAccountTransaction implements IFinancialAccountTransaction{
    id:number;
    amount:number;
    type:string;
    effectiveDate:string;
    constructor(id:number,amount:number,type:string){
        this.id = id;
        this.amount = amount;
        this.type = type;
        this.effectiveDate = moment().format("YYYY-MM-DD HH:mm:ss");
    }
}