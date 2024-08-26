import { Field, ObjectType } from "type-graphql";
import { Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import User from "./User";
import EcoAction from "./EcoAction";

@Entity()
@ObjectType()
@Unique(["user", "ecoAction"])
class LikeEcoAction {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.likes, {
    onDelete: "CASCADE",
  })
  user: User;

  @Field(() => EcoAction)
  @ManyToOne(() => EcoAction, (ecoAction) => ecoAction.likes, {
    onDelete: "CASCADE",
  })
  ecoAction: EcoAction;
}

export default LikeEcoAction;
