import { IFinancialAccount } from "../interfaces/IFinancialAccount";

export class FinancialAccount implements IFinancialAccount{
    id:number;
    amount:number;
    constructor(id:number,amount:number){
        this.id = id;
        this.amount = amount;
    }

    public getId(){
        return this.id;
    }
    public getAmount(){
        return this.amount;
    }

    public canDoDebit(amount:number):boolean{ 
        return this.amount >= amount && this.amount > 0;
    }

    public async performTransaction(amount:number,type:string){
        try{
            if(type.toLocaleLowerCase() === "debit")
                return await this.doDebit(amount);
            if(type.toLocaleLowerCase() === "credit")
                return await this.doCredit(amount);
                
            throw new Error(`Operation Type: ${type} is not a valid operation.`)
        }catch(error){
            throw error;
        }
    }

    public async doCredit(amount:number){
        return new Promise((resolve,reject)=>{
            if(amount < 0)
                reject(new Error("Amount cannot be a negative number"));
            this.amount += amount; 
            resolve(true);
        });
    }
    
    public async doDebit(amount:number){
        return new Promise((resolve,reject)=>{
            if(!this.canDoDebit(amount)){
                reject(new Error("Debit amount must be greather tan zero and cannot be greater than account amount."));
            }
            this.amount -= amount;
            resolve(true);
        });
    }
}