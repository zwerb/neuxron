/**
 * @license
 * Copyright Zwerb LLC. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/zwerb/node_neuron/master/LICENSE
 */

class Dendrite {
  static __id = 0;

  constructor(parent_neuron, connected_to = null) {
    this._id = Dendrite.__id++;
    this._weight = 0;
    this._parent_neuron = parent_neuron;
    this._connected_to = connected_to;
  }

  get id() {
    return this._id;
  }

  get weight() {
    return this._weight;
  }

  get parent_neuron() {
    return this._parent_neuron;
  }

  get connected_to() {
    return this._connected_to;
  }

  get output() {
    return this.is_firing ? this.weight : 0;
  }

  get is_firing() {
    return this.connected_to.is_firing;
  }

  set connected_to(axon_terminal) {
    this._connected_to = axon_terminal;
    return this._connected_to;
  }

  set weight(weight) {
    this._weight = weight;
  }
}

module.exports = Dendrite;
