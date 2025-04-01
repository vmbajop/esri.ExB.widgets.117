import { type ImmutableObject } from 'seamless-immutable'

export interface Config {
  exampleConfigProperty: string;
  urlDocumnetoAyuda: string;
  tituloDocumentoAyuda: string;
}

export type IMConfig = ImmutableObject<Config>