import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, EntityManager } from 'typeorm';
import { Posts } from './posts.entity';

@Entity()
export class Tags {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @ManyToMany( type => Posts, post => post.text_id)
    posts: Posts[];
}
