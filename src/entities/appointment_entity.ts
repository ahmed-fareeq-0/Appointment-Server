import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("appointments")
export class AppointmentEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false })
    patient_id!: string;

    @Column({ nullable: false })
    doctor_id!: string;

    @Column({ nullable: false })
    appointment_date!: string;

    @Column({ nullable: false })
    appointment_time!: string;

    @Column({ nullable: false })
    status!: string;


}



