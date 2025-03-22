/* eslint-disable @typescript-eslint/member-delimiter-style */
import { type ImmutableObject } from 'seamless-immutable'

export interface Config {
  exampleConfigProperty: string;
  mapId: string;
}

export type IMConfig = ImmutableObject<Config>
