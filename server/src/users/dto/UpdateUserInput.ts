import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class UpdateUserInput {
  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;
}
