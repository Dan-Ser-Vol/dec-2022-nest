import { CarDetailsResponseDto } from '../../../car/dto/response/car-details-response.dto';

export class UserDetailsResponseDto {
  id: string;
  username: string;
  email: string;
  cars: CarDetailsResponseDto[];
  createdAt: Date;
}
