import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBadRequestResponse } from '@nestjs/swagger';

interface SupeHeroApiSwaggerOptions {
  responseType: any;
  httpStatus?: HttpStatus;
}

export const SupeHeroApiSwagger = (options: SupeHeroApiSwaggerOptions) => {
  const { responseType, httpStatus = HttpStatus.OK } = options;
  
  const decorators = [
    ApiOperation({ summary: "" }),
    ApiResponse({
      status: httpStatus,
      description: "Success",
      type: responseType,
    }),
    ApiBadRequestResponse({ 
      description: "Bad Request", 
    })
  ];

  if (httpStatus !== HttpStatus.CREATED) {
    decorators.push(HttpCode(httpStatus));
  }

  return applyDecorators(...decorators);
}