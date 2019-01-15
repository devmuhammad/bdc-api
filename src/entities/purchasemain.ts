import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {purchase} from "./purchase";


@Entity("purchasemain",{schema:"cabsolbdc"})
export class purchasemain {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("int",{ 
        nullable:true,
        name:"note"
        })
    note:number | null;
        

    @Column("int",{ 
        nullable:true,
        name:"starting_no"
        })
    starting_no:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:20,
        name:"currency_prefix"
        })
    currency_prefix:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"ending_no"
        })
    ending_no:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:20,
        name:"currency_suffix"
        })
    currency_suffix:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"quantity"
        })
    quantity:number | null;
        

   
    @OneToMany(type=>purchase, purchase=>purchase.main,{ onDelete: 'RESTRICT' ,onUpdate: 'CASCADE' })
    purchases:purchase[];
    
}
