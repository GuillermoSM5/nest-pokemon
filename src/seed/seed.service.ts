import { Injectable } from '@nestjs/common';
// import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemoModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemoModel.deleteMany({}); // delete * from pokemons;

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=650',
    );

    // const insertPromisesArray = [];

    const pokemonReady = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const noPokemon: number = +segments[segments.length - 2];

      // insertPromisesArray.push(this.pokemoModel.create({ name, noPokemon }));

      return { name, noPokemon };
    });

    // await Promise.all(insertPromisesArray);

    await this.pokemoModel.insertMany([...pokemonReady]);

    return 'seed executed';
  }
}
