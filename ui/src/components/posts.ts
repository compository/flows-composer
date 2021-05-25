import Rete, { Node } from 'rete';
import { entryHashSocket } from './sockets';

export class AddToPostsStream extends Rete.Component {
  constructor() {
    super('AddToPostsStream');
  }

  async builder(node: Node) {
    node.addInput(new Rete.Input('entry_hash', 'Entry ID', entryHashSocket));
  }

  worker() {}
}
