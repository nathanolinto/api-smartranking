import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class AssignPlayerToCategoryDto {
  @IsMongoId()
  @IsNotEmpty()
  categoryId: string;

  @IsMongoId()
  @IsNotEmpty()
  playerId: string;
}
