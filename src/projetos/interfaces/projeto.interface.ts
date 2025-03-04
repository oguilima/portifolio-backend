import { Document } from 'mongoose'
import { Tecnologia } from "./tecnologia.interface"

export interface Projeto extends Document{
    title: string,
    cliente: string,
    description: string,
    github?: string,
    techs: Array<Tecnologia>,
    imagemUrl: string,
}
