import { IsEnum, IsInt, IsNumber, IsString } from 'class-validator';
import { ProducerEnum } from '../../enum/producer.enum';

export class CarDetailsResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  model: string;

  @IsInt()
  year: number;

  @IsInt()
  price: number;

  @IsEnum(ProducerEnum)
  producer: ProducerEnum;

  createdAt: Date;
}
