import { CarDetailsResponseDto } from './dto/response/car-details-response.dto';
import { CarEntity } from '../../database/entities/car.entity';

export class CarResponseMapper {
  static toListDto() {
    return;
  }

  static toListItemDto(data) {
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
