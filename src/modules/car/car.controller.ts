import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CarService } from './car.service';
import { CarCreateDto } from './dto/request/car-create.dto';
import { CarResponseMapper } from './car.response.mapper';
import { CarDetailsResponseDto } from './dto/response/car-details-response.dto';
import { CarUpdateDto } from './dto/request/car-update.dto';

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

  @ApiOperation({ summary: 'Get car by id' })
  @Get(':carId')
  async getCarById(
    @Param('carId') carId: string,
  ): Promise<CarDetailsResponseDto> {
    try {
      const result = await this.carService.getCarById(carId);
      return CarResponseMapper.toDetailsDto(result);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'Update car by id' })
  @Put(':carId')
  async updateCar(
    @Param('carId') carId: string,
    @Body() body: CarUpdateDto,
  ): Promise<CarDetailsResponseDto> {
    try {
      const result = await this.carService.updateCar(carId, body);
      return CarResponseMapper.toDetailsDto(result);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'Delete car by id' })
  @Delete(':carId')
  async deleteCar(@Param('carId') carId: string): Promise<void> {
    try {
      await this.carService.deleteCar(carId);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
