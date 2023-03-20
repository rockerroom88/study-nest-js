import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Board } from '../board/board.entity';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(type => Board, board => board.user, { eager: true })
    boards: Board[];

    async isValidPwd(password: string): Promise<boolean> {
        const isValid = await bcrypt.compare(password, this.password);
        console.log('isValid:', isValid);
        return isValid;
    }
}
