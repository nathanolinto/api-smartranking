import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IEvent } from '../interfaces/event.interface';

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  events: IEvent[];
}
