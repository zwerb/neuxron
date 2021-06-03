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
  }

  get id() {
    return this._id;
  }

  add_dendrite(connected_to = null){
    this._dendrites.push(new Dendrite(this,connected_to))
  }

  add_axon_terminal(connected_to = null){
    this._axon_terminals.push(new Axon_Terminal(this,connected_to))
  }
}

module.exports = Neuron;