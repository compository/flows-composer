import Rete, { Node } from 'rete';
import { agentPubKey, dateSocket, entryHashSocket, numSocket } from './sockets';

export class CreateInvoice extends Rete.Component {
  constructor() {
    super('CreateInvoice');
  }

  async builder(node: Node) {
    node.addInput(new Rete.Input('user', 'User', agentPubKey));
    node.addInput(new Rete.Input('amount', 'Amount', numSocket));
  }

  worker() {}
}
