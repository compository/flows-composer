import 'regenerator-runtime';

import { css, html, LitElement, property, query, unsafeCSS } from 'lit-element';
import {
  connectDeps,
  DepsElement,
  BaseElement,
} from '@holochain-open-dev/common';
import { sharedStyles } from '../sharedStyles';
import { AppWebsocket, CellId } from '@holochain/conductor-api';
import Rete from 'rete';
//@ts-ignore
import { styles as connectionStyles } from 'rete-connection-plugin';
import ConnectionPlugin from 'rete-connection-plugin';
//@ts-ignore
import Stage0RenderPlugin from 'rete-stage0-render-plugin';
//@ts-ignore
import stage0Styles from 'rete-stage0-render-plugin/build/stage0-render-plugin.min.css';
import DockPlugin from 'rete-dock-plugin';
import { AddToCalendar } from '../components/calendar-events';
import { AddToKanban, CreateTask, OnTaskCompleted } from '../components/tasks';
import { CreateInvoice } from '../components/invoice';
import { EveryWeek, Multiply } from '../components/basic';
import { AddToPostsStream } from '../components/posts';
import { ReceiveKudos } from '../components/kudos';

export abstract class HodCalendarEvent
  extends BaseElement
  implements DepsElement<any> {
  /** Public attributes */

  /** Private properties */

  @query('.node-editor') rete!: HTMLDivElement;
  @query('.dock') dock!: HTMLDivElement;

  static get styles() {
    return [
      unsafeCSS(connectionStyles),
      stage0Styles,
      sharedStyles,
      css`
        .editor {
          display: flex;
          flex-wrap: nowrap;
          flex-direction: column;
          height: 100vh;
        }

        .dock {
          height: 100px;
          overflow-x: auto;
          overflow-y: hidden;
          white-space: nowrap;
        }

        .dock-item {
          display: inline-block;
          vertical-align: top;
          transform: scale(0.8);
          transform-origin: 50% 0;
        }

        .container {
          flex: 1;
          overflow: hidden;
          display: flex;
        }

        .node-editor {
          flex: 1;
        }
      `,
    ];
  }

  abstract get _deps(): any;

  async firstUpdated() {
    const editor = new Rete.NodeEditor('demo@0.1.0', this.rete);
    console.log(ConnectionPlugin);
    editor.use(ConnectionPlugin);

    editor.use(Stage0RenderPlugin);

    editor.use(DockPlugin, {
      container: this.dock,
      plugins: [Stage0RenderPlugin], // render plugins
    } as any);

    editor.register(new CreateTask());
    editor.register(new EveryWeek());
    editor.register(new CreateInvoice());
    editor.register(new AddToKanban());
    editor.register(new Multiply());
    editor.register(new OnTaskCompleted());
    editor.register(new AddToPostsStream());
    editor.register(new ReceiveKudos());
    editor.register(new AddToCalendar());
  }

  render() {
    return html`
      <div class="editor">
        <div class="container">
          <div class="node-editor"></div>
        </div>
        <div class="dock"></div>
      </div>
    `;
  }
}
