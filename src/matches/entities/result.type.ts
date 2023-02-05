import { IsString } from 'class-validator';
import { Column } from 'typeorm';
import { IResult } from '../interfaces/result.interface';

export class ResultType implements IResult {
  @Column()
  @IsString()
  set: string;
}
