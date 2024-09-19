import { IsDefined, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { StateEnum } from '../enums/state.enum';

export class UpdateHireDTO {
  @IsDefined({ message: 'El estado del contrato es necesario' })
  @IsNotEmpty()
  @IsEnum(StateEnum)
  @IsNumber()
  state: StateEnum;
}
