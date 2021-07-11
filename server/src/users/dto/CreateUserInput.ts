import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class CreateUserInput {
  @Field(() => String, { nullable: false })
  username!: string;

  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  password!: string;
}
