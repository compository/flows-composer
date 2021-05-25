import Rete, { Node } from 'rete';
import {
  agentPubKey,
  dateSocket,
  entryHashSocket,
  numSocket,
  stringSocket,
} from './sockets';

export class CreateTask extends Rete.Component {
  constructor() {
    super('CreateTask');
  }

  async builder(node: Node) {
    node.addInput(new Rete.Input('start_date', 'Name', stringSocket));
    node.addInput(new Rete.Input('min_agents', 'Min. people', numSocket));
    node.addInput(new Rete.Input('deadline', 'Deadline', dateSocket));
    node.addOutput(new Rete.Output('entry_hash', 'Entry ID', entryHashSocket));
  }

  worker() {}
}

export class AddToKanban extends Rete.Component {
  constructor() {
    super('AddToKanban');
  }

  async builder(node: Node) {
    node.addInput(new Rete.Input('entry_hash', 'Entry ID', entryHashSocket));
  }

  worker() {}
}

export class OnTaskCompleted extends Rete.Component {
  constructor() {
    super('OnTaskCompleted');
  }

  async builder(node: Node) {
    node.addOutput(new Rete.Output('entry_hash', 'Entry ID', entryHashSocket));
    node.addOutput(new Rete.Output('assignee', 'Assignee', agentPubKey));
    node.addOutput(new Rete.Output('effort', 'Effort', numSocket));
  }

  worker() {}
}
