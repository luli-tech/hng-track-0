import { PartialType } from '@nestjs/mapped-types';
import { CreateStringAnalyserDto } from './create-string-analyser.dto';

export class UpdateStringAnalyserDto extends PartialType(CreateStringAnalyserDto) {}
