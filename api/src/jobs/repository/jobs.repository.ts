import { Repository } from 'typeorm';
import { Jobs } from '../jobs.entity';

export class JobsRepository extends Repository<Jobs> {}
