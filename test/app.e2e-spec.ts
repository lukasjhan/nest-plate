import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(404);
  });

  describe('/data', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/data').expect(200).expect([]);
    });

    it('GET', () => {
      return request(app.getHttpServer()).get('/data/111').expect(404);
    });

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/data')
        .send({ value: 'Test' })
        .expect(201)
        .expect('0');
    });

    it('DELETE', () => {
      const server = app.getHttpServer();
      request(server).delete('/data/0').expect(404);
      request(server).post('/data').send({ value: 'Test' }).expect(201);
      request(server).delete('/data/1').expect(200);
    });
  });
});
