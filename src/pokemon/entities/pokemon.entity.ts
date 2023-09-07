import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pokemon extends Document {
  //   id:string  // MOngo ya no los da
  @Prop({
    unique: true,
    index: true,
  })
  name: string;

  @Prop({
    unique: true,
    index: true,
  })
  noPokemon: string;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
