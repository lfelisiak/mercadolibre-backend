export interface IMeliItem{
        id: String,
        title: String,
        price: {
            currency: String,
            amount: Number,
            decimals: Number
        },
        condition: String,
        free_shipping: Boolean,
        address?:{
            state: String,
            city: String
        },
        picture?: String,
        sold_quantity?: Number,
        description?: String,       
        category_id?: String,       
        permalink?: String,       
}