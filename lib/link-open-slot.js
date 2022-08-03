'use babel';

import LinkOpenSlotView from './link-open-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  linkOpenSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.linkOpenSlotView = new LinkOpenSlotView(state.linkOpenSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.linkOpenSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'link-open-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.linkOpenSlotView.destroy();
  },

  serialize() {
    return {
      linkOpenSlotViewState: this.linkOpenSlotView.serialize()
    };
  },

  toggle() {
    console.log('LinkOpenSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
