import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {currency} from "./currency";


@Entity("daily_rate",{schema:"cabsolbdc"})
@Index("CurrencyID_FK_idx",["currency",])
export class daily_rate {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

   
    @ManyToOne(type=>currency, currency=>currency.daily_rates,{ onDelete: 'NO ACTION',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'currencyid'})
    currency:currency | null;

    
    @Column("timestamp",{ 
        name:"datecreated"
        })
    datecreated:string | null;
        

    @Column("double",{ 
        nullable:true,
        precision:22,
        name:"buy_rate_official"
        })
    buy_rate_official:number | null;
        

    @Column("double",{ 
        nullable:true,
        precision:22,
        name:"buy_rate_market"
        })
    buy_rate_market:number | null;
        

    @Column("double",{ 
        nullable:true,
        precision:22,
        name:"sell_rate_official"
        })
    sell_rate_official:number | null;
        

    @Column("double",{ 
        nullable:true,
        precision:22,
        name:"sell_rate_market"
        })
    sell_rate_market:number | null;
        
}
