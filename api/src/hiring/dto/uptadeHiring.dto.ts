import {  IsDefined, IsNotEmpty, IsNumber} from "class-validator";

export class UpdateHireDTO{
    @IsDefined({message:'El estado del contrato es necesario'})
    @IsNotEmpty()
    @IsNumber()
    state: {
        id: number;
    }
    
}