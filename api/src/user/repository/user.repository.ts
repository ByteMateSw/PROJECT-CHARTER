import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { UserFilter } from '../dto/userFilter.dto';
import { UserPagination } from '../dto/userpagination.dto';

export class UserRepository extends Repository<User> {
  async getFilterUsers(
    filter: UserFilter,
    pagination: UserPagination,
  ): Promise<User[]> {
    const { habilities, location } = filter;
    const { limit, page } = pagination;
    const query = this.createQueryBuilder('user');
    query.leftJoinAndSelect('user.city', 'city');

    if (habilities) {
      query.andWhere('user.habilities = :habilities', { habilities });
    }

    if (location) {
      query.andWhere('city.name = :name', { name: location });
    }
    const users = await query.skip(page).take(limit).getMany();
    return users;
  }
}
