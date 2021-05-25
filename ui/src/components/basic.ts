import Rete, { Node } from 'rete';
import { dateSocket, numSocket } from './sockets';

export class Multiply extends Rete.Component {
  constructor() {
    super('Multiply');
  }

  async builder(node: Node) {
    node.addInput(new Rete.Input('num1', 'Number', numSocket));
    node.addInput(new Rete.Input('num2', 'Number', numSocket));
    node.addOutput(new Rete.Output('output', 'Number', numSocket));
  }

  worker() {}
}

export class EveryWeek extends Rete.Component {
  constructor() {
    super('EveryWeek');
  }

  async builder(node: Node) {
    node.addOutput(new Rete.Output('date', 'Date', dateSocket));
  }

  worker() {}
}
