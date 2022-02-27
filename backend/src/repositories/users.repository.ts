import { hash } from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { User } from '@interfaces/users.interface';
import UserEntity from '@entities/users.entity';
import { isEmpty } from '@utils/util';

class UserRepository {
  public users = UserEntity;

  public async userFindAll(): Promise<User[]> {
    const users: User[] = await this.users.find();
    return users;
  }

  public async userFindById(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'User id cannot be empty');

    const findUser: User = await this.users.findOne({ id: userId });
    if (!findUser) throw new HttpException(409, "You're not user");

    return findUser;
  }

  public async userCreate(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'User data cannot be empty');

    const findUser: User = await this.users.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `Email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async userUpdate(userId: string, userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'User data cannot be empty');

    if (userData.email) {
      const findUser: User = await this.users.findOne({ email: userData.email });
      if (findUser && findUser.id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: User = await this.users.findByIdAndUpdate(userId, { userData });
    if (!updateUserById) throw new HttpException(409, "You're not user");

    return updateUserById;
  }

  public async userDelete(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "You're not user");

    return deleteUserById;
  }
}

export default UserRepository;
