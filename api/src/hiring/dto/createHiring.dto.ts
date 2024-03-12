import { 
    IsDefined, 
    IsNotEmpty, 
    IsNumber } 
    from "class-validator";

export class CreateHiringDTO {
    @IsNumber()
    @IsDefined({message: 'El Id del contratante es necesario'})
    @IsNotEmpty()
    contractorId: number;
    @IsNumber()
    @IsDefined({message: 'El Id del contratado es necesario'})
    @IsNotEmpty()
    contractedId: number; 
}