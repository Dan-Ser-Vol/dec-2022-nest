import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../../database/entities/user.entity';
import { UserListQueryRequestDto } from './dto/request/user.-list-query.request.dto';
import { IList } from '../../common/interface/list.interface';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async getAll(
    query: UserListQueryRequestDto,
  ): Promise<IList<UserEntity>> {
    const queryBuilder = this.createQueryBuilder('user');

    queryBuilder.limit(query.limit);
    queryBuilder.offset(query.offset);

    const [entities, total] = await queryBuilder.getManyAndCount();
    return { entities, total };
  }
}
