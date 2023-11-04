import { UserEntity } from '../../database/entities/user.entity';
import {
  UserListItemResponseDto,
  UserListResponseDto,
} from './dto/response/user.list-response.dto';
import { IList } from '../../common/interface/list.interface';
import { UserListQueryRequestDto } from './dto/request/user.-list-query.request.dto';

export class UserResponseMapper {
  static toListDto(
    data: IList<UserEntity>,
    query: UserListQueryRequestDto,
  ): UserListResponseDto {
    return {
      data: data.entities.map(this.toListItemDto),
      total: data.total,
      ...query,
    };
  }

  static toListItemDto(data: UserEntity): UserListItemResponseDto {
    return {
      id: data.id,
      username: data.username,
      age: data.age,
      email: data.email,
      createdAt: data.createdAt,
    };
  }

  static toDetailsDto(data: UserEntity) {
    return {
      id: data.id,
      username: data.username,
      age: data.age,
      email: data.email,
      createdAt: data.createdAt,
    };
  }
}
