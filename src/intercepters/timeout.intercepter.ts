import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { catchError, Observable, throwError, timeout } from 'rxjs';
import { TIMEOUT_METADATA_KEY } from './timeout-handle.decorator';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const timeoutValue = this.reflector.get<number>(
      TIMEOUT_METADATA_KEY,
      context.getHandler(),
    );

    if (!timeoutValue) {
      return next.handle();
    }

    return next.handle().pipe(
      timeout(timeoutValue),
      catchError((error) => {
        if (error.name === 'TimeoutError') {
          return throwError(
            () =>
              new HttpException('Request Timeout', HttpStatus.REQUEST_TIMEOUT),
          );
        } else {
          return throwError(() => error);
        }
      }),
    );
  }
}
