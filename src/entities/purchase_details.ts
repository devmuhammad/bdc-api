import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId, Timestamp} from "typeorm";
import {purchase} from "./purchase";
import {selling} from "./selling";


@Entity("purchase_details",{schema:"cabsolbdc"})
@Index("FK_purchaseID",["purchase",])
@Index("FK_salesID",["sales",])

export class purchase_details {

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

    @Column("double",{ 
        nullable:true,
        precision:22,
        name:"buyrate"
        })
    buyrate:number | null;

    @Column("double",{ 
        nullable:true,
        precision:22,
        name:"soldrate"
        })
    soldrate:number | null;

    @Column("char",{ 
        nullable:true,
        length:20,
        name:"status"
        })
    status:string | null;

    @Column("varchar",{ 
        nullable:true,
        length:50,
        name:"currency"
        })
    currency:string | null;

    @Column("varchar",{ 
        nullable:true,
        length:50,
        name:"currencyno"
        })
    currencyno:string | null;

    @ManyToOne(type=>purchase, purchase=>purchase.purchase_detail,{ onDelete: 'NO ACTION',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'purchaseid'})
    purchase:purchase | null;

    @ManyToOne(type=>selling, sales=>sales.purchase_detail,{ onDelete: 'NO ACTION',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'salesid'})
    sales:selling | null;
}