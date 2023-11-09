import { CarDetailsResponseDto } from './dto/response/car-details-response.dto';
import { CarEntity } from '../../database/entities/car.entity';

export class CarResponseMapper {
  static toDetailsListDto(data: CarEntity[]): CarDetailsResponseDto[] {
    return data.map(this.toDetailsDto);
  }

  static toListItemDto() {
    return;
  }

  static toDetailsDto(data: CarEntity): CarDetailsResponseDto {
    return {
      id: data.id,
      model: data.model,
      year: data.year,
      price: data.price,
      producer: data.producer,
      createdAt: data.createdAt,
    };
  }
}
