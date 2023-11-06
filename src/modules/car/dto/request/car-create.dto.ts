import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ProducerEnum } from '../../enum/producer.enum';

export class CarCreateDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  model: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1970)
  @Max(new Date().getFullYear())
  year: number;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsEnum(ProducerEnum)
  @IsNotEmpty()
  producer: ProducerEnum;
}
