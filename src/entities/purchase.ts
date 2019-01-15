import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {purchasemain} from "./purchasemain";
import {currency} from "./currency";
import {users} from "./users";
import {selling} from "./selling";


@Entity("purchase",{schema:"cabsolbdc"})
@Index("CurrencyID_FK_idx",["currency",])
@Index("CFK_Purchase_Currency_idx",["currency",])
@Index("FK_UserID_idx",["user",])
@Index("FK_Purchasemain_id",["main",])
export class purchase {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

   
    @ManyToOne(type=>purchasemain, purchasemain=>purchasemain.purchases,{ onDelete: 'RESTRICT',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'mainid'})
    main:purchasemain | null;


    // @Column("int",{ 
    //     nullable:true,
    //     name:"note"
    //     })
    // note:number | null;
        

   
    @ManyToOne(type=>currency, currency=>currency.purchases,{ onDelete: 'NO ACTION',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'currencyid'})
    currency:currency | null;

    @Column("simple-array")
    purchase_details:{currencyno: string,note:number,buyingrate: number}[];

    // @Column("varchar",{ 
    //     nullable:true,
    //     length:45,
    //     name:"currencyno"
    //     })
    // currencyno:string | null;
        

    @Column("int",{ 
        nullable:true,
        name:"quantity"
        })
    quantity:number | null;
        

    // @Column("double",{ 
    //     nullable:true,
    //     precision:22,
    //     name:"buyingrate"
    //     })
    // buyingrate:number | null;
        

    @Column("double",{ 
        nullable:true,
        precision:22,
        name:"totalamount"
        })
    totalamount:number | null;
        

    @Column("varchar",{ 
        nullable:false,
        length:50,
        name:"transaction_ref"
        })
    transaction_ref:string;
        

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
        

    @Column("varchar",{ 
        nullable:true,
        length:45,
        name:"status"
        })
    status:string | null;
        

   
    @ManyToOne(type=>users, users=>users.purchases,{ onDelete: 'NO ACTION',onUpdate: 'CASCADE' })
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
        

   
    @OneToMany(type=>selling, selling=>selling.purchase,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    sellings:selling[];
    
}
