import { IsString } from 'class-validator';

export class CreateDataDTO {
  @IsString()
  readonly value: string;
}
