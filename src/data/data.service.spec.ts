import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataService],
    }).compile();

    service = module.get<DataService>(DataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an arry', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a data', () => {
      service.create({
        value: 'Test',
      });
      const data = service.getOne('0');
      expect(data).toBeDefined();
      expect(data.id).toEqual('0');
    });

    it('should throw 404 error', () => {
      try {
        service.getOne('1');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.status).toEqual(404);
      }
    });
  });

  describe('create', () => {
    it('should create a data', () => {
      const beforeData = service.getAll().length;
      service.create({
        value: 'Test',
      });
      const afterData = service.getAll().length;
      expect(afterData).toBeGreaterThan(beforeData);
    });
  });

  describe('deleteOne', () => {
    it('deletes a data', () => {
      service.create({
        value: 'Test',
      });
      const beforeData = service.getAll();
      service.deleteOne('0');
      const afterData = service.getAll();
      expect(afterData.length).toBeLessThan(beforeData.length);
    });

    it('should throw 404 error', () => {
      try {
        service.deleteOne('1');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.status).toEqual(404);
      }
    });
  });

  describe('updateOne', () => {
    it('should update a data', () => {
      service.create({
        value: 'Test',
      });
      service.updateOne('0', { value: 'Updated Test' });
      const data = service.getOne('0');
      expect(data.value).toEqual('Updated Test');
    });

    it('should throw 404 error', () => {
      try {
        service.updateOne('1', {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.status).toEqual(404);
      }
    });
  });
});
