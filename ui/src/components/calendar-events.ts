import Rete, { Node } from 'rete';
import { dateSocket, entryHashSocket } from './sockets';

export class AddToCalendar extends Rete.Component {
  constructor() {
    super('AddToCalendar');
  }

  async builder(node: Node) {
    node.addInput(new Rete.Input('entry_hash', 'Entry ID', entryHashSocket));
    node.addInput(new Rete.Input('start_date', 'Start Date', dateSocket));
    node.addInput(new Rete.Input('end_date', 'End Date', dateSocket));
  }

  worker() {}
}
