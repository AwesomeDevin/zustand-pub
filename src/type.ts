import store, { StateCreator, StoreApi, StoreMutatorIdentifier } from 'zustand/vanilla'
import PubStore from './PubStore'



export interface IUnit<T extends object = any, Mos extends [StoreMutatorIdentifier, unknown][] = []> {
  value: StoreApi<T>,
  pubStore: PubStore,
  fn: StateCreator<T, [], Mos>
}