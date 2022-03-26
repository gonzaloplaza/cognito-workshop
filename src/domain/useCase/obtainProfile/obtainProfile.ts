import { UserRepository } from '@domain/repository/userRepository';
import { User } from '@domain/model/user';

export class ObtainProfile {
  constructor(private userRepository: UserRepository) {}

  public async invoke(userId: string): Promise<User> {
    return await this.userRepository.getUserById(userId);
  }
}
