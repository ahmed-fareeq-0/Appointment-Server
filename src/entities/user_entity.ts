import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class PatientEntity extends BaseEntity {
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

@Entity("doctors")
export class DoctorEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    name!: string;

    @Column({ nullable: false })
    email!: string;

    @Column({ nullable: false })
    password!: string;

    @Column({ nullable: false })
    phone!: string;

    @Column({ nullable: false })
    specialty!: string;

    @Column({ nullable: false })
    office_location!: string;

    @Column({ nullable: false })
    office_location_latitude!: number;

    @Column({ nullable: false })
    office_location_longitude!: number;

    @Column({ nullable: false })
    user_type!: string;
}
