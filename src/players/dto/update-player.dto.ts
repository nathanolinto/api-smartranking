import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePlayerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
