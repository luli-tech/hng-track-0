import { IsString, IsNotEmpty } from 'class-validator';

export class CreateStringAnalyserDto {
  @IsString()
  @IsNotEmpty()
  value: string;
}
