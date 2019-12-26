import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Users } from './users.entity';
import { Tags } from './tags.entity';

@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    text_id: number;

    @Column('text')
    content: string;

    @ManyToOne(type => Users)
    user: Users;

    @ManyToMany(type => Tags, tag => tag.id, { cascade: true })
    @JoinTable()
    tag: Tags[];
}