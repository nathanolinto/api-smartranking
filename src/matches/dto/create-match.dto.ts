import { Type } from 'class-transformer';
import { ArrayMinSize, IsMongoId, ValidateNested } from 'class-validator';
import { ResultType } from '../entities/result.type';

export class CreateMatchDto {
  @IsMongoId({ each: true })
  @ArrayMinSize(2)
  players: string[];

  @ValidateNested()
  @Type(() => ResultType)
  result: ResultType[];

  @IsMongoId()
  winner: string;
}
