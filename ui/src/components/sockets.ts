import Rete from 'rete';

export const entryHashSocket = new Rete.Socket('EntryHash');
export const agentPubKey = new Rete.Socket('AgentPubKey');
export const dateSocket = new Rete.Socket('Date');
export const numSocket = new Rete.Socket('Number');
export const stringSocket = new Rete.Socket('String');
