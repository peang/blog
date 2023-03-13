import { Controller, Post } from '@nestjs/common';
import { JWTService } from 'src/application/services/JWTService';
import { IApiResponse } from 'src/application/types/app';

@Controller({
  path: '/auth'
})
export class AuthController {
  @Post('/login')
  public async login(): Promise<IApiResponse> {
    const token: string = await JWTService.generateToken(
      {
        id: 1,
        name: "irvan"
      },
      process.env.JWT_SECRET,
      "tes"
    );

    return {
      message: "Login Looks Good :)",
      data: token,
    }
  }
}
