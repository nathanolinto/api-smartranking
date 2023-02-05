import { IsNumber, IsString } from 'class-validator';
import { Column } from 'typeorm';
import { IEvent } from '../interfaces/event.interface';

export class EventType implements IEvent {
  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  operation: string;

  @Column()
  @IsNumber()
  value: number;
}
