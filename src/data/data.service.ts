import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDataDTO } from './dto/create-data.dto';
import { UpdateDataDTO } from './dto/update-data.dto';
import { Data } from './entities/data.entity';

@Injectable()
export class DataService {
  private data: Data[] = [];

  getAll(): Data[] {
    return this.data;
  }

  getOne(id: string): Data {
    const data = this.data.find((item) => item.id === id);
    if (!data) {
      throw new NotFoundException(`data with id: ${id} not found`);
    }
    return data;
  }

  create(data: CreateDataDTO): string {
    const newId = this.data.length.toString();
    this.data.push({ id: newId, ...data });
    return newId;
  }

  deleteOne(id: string) {
    this.getOne(id);
    this.data = this.data.filter((item) => item.id !== id);
  }

  updateOne(id: string, updateData: UpdateDataDTO) {
    this.getOne(id);
    this.data = this.data.map((item) =>
      item.id === id ? { ...item, ...updateData } : item,
    );
  }

  search(value: string) {
    return this.data.filter((item) => item.value === value);
  }
}
