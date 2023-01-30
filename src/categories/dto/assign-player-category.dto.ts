import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class AssignPlayerToCategoryDto {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  playerId: string;
}
