import { Document } from 'mongoose'
import { Tecnologia } from "./tecnologia.interface"

export interface Projeto extends Document{
    //img: string,
    title: string,
    cliente: string,
    description: string,
    github?: string,
    techs: Tecnologia[]
}
