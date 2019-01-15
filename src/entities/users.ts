import {BaseEntity,Column,Entity,BeforeInsert,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {purchase} from "./purchase";
import {selling} from "./selling";
import {IsEmail} from 'class-validator';
import * as crypto from 'crypto';

@Entity("users",{schema:"cabsolbdc"})
export class users {

    @PrimaryGeneratedColumn({ 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:70,
        name:"username"
        })
    username:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:100,
        name:"fullname"
        })
    fullname:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:70,
        name:"email"
        })
    @IsEmail()
    email:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"phone_number"
        })
    phone_number:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:150,
        name:"password"
        })
    password:string | null;
    
    @BeforeInsert()
    hashPassword(){
        this.password = crypto.createHmac('sha265', this.password).digest('hex')
    }

    @Column("varchar",{ 
        nullable:true,
        length:100,
        name:"location"
        })
    location:string | null;
        

   
    @OneToMany(type=>purchase, purchase=>purchase.user,{ onDelete: 'NO ACTION' ,onUpdate: 'CASCADE' })
    purchases:purchase[];
    

   
    @OneToMany(type=>selling, selling=>selling.user,{ onDelete: 'NO ACTION' ,onUpdate: 'CASCADE' })
    sellings:selling[];
    
}
