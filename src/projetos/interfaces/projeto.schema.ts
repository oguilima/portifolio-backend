import * as mongoose from 'mongoose';
import { Tecnologia } from './tecnologia.interface';

export const ProjetoSchema = new mongoose.Schema({
    title:  String,
    cliente: String,
    description: String,
    github: String,
    techs: Array<Tecnologia>,
}, { timestamps: true, collection: 'projetos' });
