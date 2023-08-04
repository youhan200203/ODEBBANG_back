import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ParticipantDocument = HydratedDocument<Participant>;

@Schema()
export class Participant {
  @Prop()
  university: string;

  @Prop()
  sharedBy: string;

  @Prop()
  createdAt: string;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
