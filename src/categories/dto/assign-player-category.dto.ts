import { IsMongoId, IsNotEmpty } from 'class-validator';

export class AssignPlayerToCategoryDto {
  @IsMongoId()
  @IsNotEmpty()
  categoryId: string;

  @IsMongoId()
  @IsNotEmpty()
  playerId: string;
}
