import mongoose from "mongoose";

export interface Product{
    _id? : string;
    name : string;
    image : string;    
    price : string;
    qty : string;
    info : string;
    created_at? : string;
    updated_at? : string;
}

