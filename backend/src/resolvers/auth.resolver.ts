import { Authorized, Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { LoginUserDto } from '@dtos/login.dto';
import { SignupUserDto } from '@dtos/signup.dto';
import AuthRepository from '@repositories/auth.repository';
import { Token } from '@typedefs/token.type';
import { User } from '@typedefs/users.type';
import { Auth } from '@/typedefs/auth.type';

@Resolver()
export class authResolver extends AuthRepository {
  @Mutation(() => User, {
    description: 'User signup',
  })
  async signup(@Arg('userData') userData: SignupUserDto): Promise<User> {
    const user: User = await this.userSignUp(userData);
    return user;
  }

  @Mutation(() => Auth, {
    description: 'User login',
  })
  async login(@Arg('userData') userData: LoginUserDto): Promise<{ user: User; token: Token }> {
    const { findUser, tokenData } = await this.userLogIn(userData);
    return { user: findUser, token: tokenData };
  }

  @Authorized()
  @Mutation(() => User, {
    description: 'User logout',
  })
  async logout(@Ctx('user') userData: any): Promise<User> {
    const user = await this.userLogOut(userData);
    return user;
  }
}
