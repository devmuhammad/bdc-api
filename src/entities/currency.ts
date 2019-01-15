import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {daily_rate} from "./daily_rate";
import {purchase} from "./purchase";
import {selling} from "./selling";


@Entity("currency",{schema:"cabsolbdc"})
export class currency {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"code"
        })
    code:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:100,
        name:"desc"
        })
    desc:string | null;
        

   
    @OneToMany(type=>daily_rate, daily_rate=>daily_rate.currency,{ onDelete: 'NO ACTION' ,onUpdate: 'CASCADE' })
    daily_rates:daily_rate[];
    

   
    @OneToMany(type=>purchase, purchase=>purchase.currency,{ onDelete: 'NO ACTION' ,onUpdate: 'CASCADE' })
    purchases:purchase[];
    

   
    @OneToMany(type=>selling, selling=>selling.currency,{ onDelete: 'NO ACTION' ,onUpdate: 'CASCADE' })
    sellings:selling[];
    
}
