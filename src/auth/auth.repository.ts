import { Repository } from 'typeorm';
import { Auth } from './etc/auth.entity';
import { AuthCredentialDto } from './etc/auth.dto';

export class AuthRepository extends Repository<Auth> {
    async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
        const { username, password } = authCredentialDto;
        const user = await this.create({ username, password });
        await this.save(user);
    }
}
