import { IsNotEmpty, Length } from 'class-validator';

export class ProductDetailsDto {
  @IsNotEmpty()
  @Length(1)
  id: number;
}
