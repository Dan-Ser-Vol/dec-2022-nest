import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CarService } from './car.service';
import { CarCreateDto } from './dto/request/car-create.dto';
import { CarResponseMapper } from './car.response.mapper';
import { CarDetailsResponseDto } from './dto/response/car-details-response.dto';

@ApiTags('Cars')
@Controller('cars')
export class CarController {
  constructor(private carService: CarService) {}

  @ApiOperation({ summary: 'Create new car' })
  @Post('create')
  async createCar(@Body() data: CarCreateDto): Promise<CarDetailsResponseDto> {
    const result = await this.carService.createCar(data);
    return CarResponseMapper.toDetailsDto(result);
  }
}
