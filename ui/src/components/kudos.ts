import Rete, { Node } from 'rete';
import { agentPubKey, dateSocket, entryHashSocket, numSocket } from './sockets';

export class ReceiveKudos extends Rete.Component {
  constructor() {
    super('ReceiveKudos');
  }

  async builder(node: Node) {
    node.addInput(new Rete.Input('user', 'User', agentPubKey));
    node.addInput(new Rete.Input('kudos_points', 'Kudos Amount', numSocket));
  }

  worker() {}
}
