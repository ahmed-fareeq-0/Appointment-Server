import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User_entity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: false })
    name!: string

    @Column({ nullable: false })
    email!: string

    @Column({ nullable: false })
    password!: string

    @Column({ nullable: false })
    phone!: string

    @Column()
    user_type!: string
}