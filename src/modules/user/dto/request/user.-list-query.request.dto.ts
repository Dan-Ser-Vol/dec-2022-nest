import { OrderEnum } from '../../../../common/enum/order.enum';
import { IsEnum, IsOptional } from 'class-validator';
import { UserListOrderFieldEnum } from '../../enum/user-list-order-field.enum';
import { PaginationQueryDto } from '../../../../common/dto/pagination.query.dto';

export class UserListQueryRequestDto extends PaginationQueryDto {
  @IsEnum(OrderEnum)
  @IsOptional()
  order?: string = OrderEnum.ASC;

  @IsEnum(UserListOrderFieldEnum)
  @IsOptional()
  orderBy?: string = UserListOrderFieldEnum.createdAt;
}
