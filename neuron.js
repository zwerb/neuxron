/**
 * @license
 * Copyright Zwerb LLC. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/zwerb/node_neuron/master/LICENSE
 */

const Axon_Terminal = require("./axon_terminal");
const Dendrite = require("./dendrite");

class Neuron {
  static __id = 0;

  constructor() {
    this._id = Neuron.__id++;
    this._dendrites = [];
    this._axon_terminals = [];
    this._potential = 0;
    this._threshold = 1;
  }

  get id() {
    return this._id;
  }

  get dendrites() {
    return this._dendrites;
  }

  get axon_terminals() {
    return this._axon_terminals;
  }

  get potential() {
    return this._potential;
  }

  get threshold() {
    return this._threshold;
  }

  get connection_ids() {
    return this.axon_terminals.map(
      (axon_terminal) => axon_terminal.connected_to.id
    );
  }

  add_dendrite(connected_to = null) {
    return this.dendrites.push(new Dendrite(this, connected_to));
  }

  add_axon_terminal(connected_to = null) {
    return this.axon_terminals.push(new Axon_Terminal(this, connected_to));
  }

  add_connection(neuron) {
    neuron.add_dendrite(this.add_axon_terminal(neuron));
  }

  fire() {
    this.axon_terminals.forEach((axon_terminal) => {
      axon_terminal.fire();
    });
  }

  inhibit() {
    this.axon_terminals.forEach((axon_terminal) => {
      axon_terminal.inhibit();
    });
  }

  regress() {
    // how do we ramp down
  }

  // calculate an instant / step (add inputs, process, outputs)
  step() {
    let temp_potential = this.dendrites.reduce((accumulator, dendrite) => {
      accumulator + dendrite.output;
    });

    if (temp_potential > this.threshold) {
      this.fire();
    }

    this.regress();
  }
}

module.exports = Neuron;
