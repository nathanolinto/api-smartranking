import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IEvent } from '../interfaces/event.interface';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  events: IEvent[];
}
