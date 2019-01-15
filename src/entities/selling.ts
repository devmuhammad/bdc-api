import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, Timestamp} from "typeorm";
import {purchase} from "./purchase";
import {currency} from "./currency";
import {users} from "./users";


@Entity("selling",{schema:"cabsolbdc"})
@Index("FK_Selling_Currency_idx",["currency",])
@Index("FK_UserID_idx",["user",])
@Index("FK_Selling_User_idx",["user",])
@Index("FK_purchase_id",["purchase",])
export class selling {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

   
    @ManyToOne(type=>purchase, purchase=>purchase.sellings,{ onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'purchaseid'})
    purchase:purchase | null;


    @Column("int",{ 
        nullable:true,
        name:"note"
        })
    note:number | null;
        

   
    @ManyToOne(type=>currency, currency=>currency.sellings,{ onDelete: 'NO ACTION',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'currencyid'})
    currency:currency | null;


    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"currencyno"
        })
    currencyno:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"quantity"
        })
    quantity:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:50,
        name:"transaction_ref"
        })
    transaction_ref:string | null;
        

    @Column("double",{ 
        nullable:true,
        precision:22,
        name:"buyingrate"
        })
    buyingrate:number | null;
        

    @Column("double",{ 
        nullable:true,
        precision:22,
        name:"soldrate"
        })
    soldrate:number | null;
        

    @Column("double",{ 
        nullable:true,
        precision:22,
        name:"totalamount"
        })
    totalamount:number | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"mode_of_purchase"
        })
    mode_of_purchase:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:50,
        name:"mode_of_id"
        })
    mode_of_id:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        length:100,
        name:"id_no"
        })
    id_no:string | null;
        

    @Column("date",{ 
        nullable:true,
        name:"id_expirydate"
        })
    id_expirydate:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"bvn"
        })
    bvn:number | null;
        

   
    @ManyToOne(type=>users, users=>users.sellings,{ onDelete: 'NO ACTION',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'userid'})
    user:users | null;


    @Column("datetime",{ 
        nullable:true,
        name:"transaction_date"
        })
    transaction_date:Date | null;
        

    @Column("timestamp",{ 
        name:"system_date"
        })
    system_date:string | null;
        
}
