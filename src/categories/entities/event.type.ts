import { Column } from 'typeorm';
import { IEvent } from '../interfaces/event.interface';

export class EventType implements IEvent {
  @Column()
  name: string;

  @Column()
  operation: string;

  @Column()
  value: number;
}
