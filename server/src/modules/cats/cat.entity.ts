import { Column, Model, Table } from 'sequelize-typescript';

@Table({})
export class Cat extends Model<Cat> {
    @Column('string')
    name: string;

    @Column('number')
    age: number;

    @Column('string')
    breed: string;
}
