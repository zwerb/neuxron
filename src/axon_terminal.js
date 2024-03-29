/**
 * @license
 * Copyright Zwerb LLC. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://raw.githubusercontent.com/zwerb/node_neuron/master/LICENSE
 */

class Axon_Terminal {
  static __id = 0;

  constructor(parent_neuron, connected_to = null) {
    this._id = Axon_Terminal.__id++;
    this._is_firing = false;
    this._parent_neuron = parent_neuron;
    this._connected_to = connected_to;
  }

  get id() {
    return this._id;
  }

  get threshold() {
    return this._threshold;
  }

  get is_firing() {
    return this._is_firing;
  }

  get parent_neuron() {
    return this._parent_neuron;
  }

  get connected_to() {
    return this._connected_to;
  }

  set is_firing(is_firing) {
    this._is_firing = is_firing;
    return this._is_firing;
  }

  set connected_to(dendrite) {
    this._connected_to = dendrite;
    return this._connected_to;
  }

  fire() {
    this.is_firing = true;
  }

  inhibit() {
    this.is_firing = false;
  }

  toggle_firing() {
    this.is_firing = !this.is_firing;
  }
}

module.exports = Axon_Terminal;
