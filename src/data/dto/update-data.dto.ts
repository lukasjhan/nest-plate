import { PartialType } from '@nestjs/mapped-types';
import { CreateDataDTO } from './create-data.dto';

export class UpdateDataDTO extends PartialType(CreateDataDTO) {}
