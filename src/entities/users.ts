import {BaseEntity,Column,Entity,BeforeInsert,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {purchase} from "./purchase";
import {selling} from "./selling";
import {IsEmail} from 'class-validator';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';


@Entity("users",{schema:"cabsolbdc"})
export class users {

    @BeforeInsert()
    genId(){
     
     this.id = parseInt(generate());
    }
    @PrimaryColumn({
            name: 'id',
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
    
    // @BeforeInsert()
    // hashPassword(){       
    //     this.password = bcrypt.hashSync(this.password,8)
       
    // }

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


	 
    let length = 8;
    let timestamp = +new Date;
    
    const _getRandomInt = ( min, max ) => {
       return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }
    
    const generate = function (){
        let ts = timestamp.toString();
        let parts = ts.split( "" ).reverse();
        let id = "";
        
        for( let i = 0; i < length; ++i ) {
           let index = _getRandomInt( 0, parts.length - 1 );
           id += parts[index];	 
        }
        
        return id;
    }
