import { type ImmutableObject } from 'seamless-immutable'

export interface Config {
  urlDocumentoAyuda: string;
  tituloDocumentoAyuda: string;
}

export type IMConfig = ImmutableObject<Config>