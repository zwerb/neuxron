/* Test Specs */

const Neural_Circuit = require("./src/neural_circuit");

console.log("Test Specs:");

const neural_circuit = new Neural_Circuit();
neural_circuit.add_neural_layers_of_size(5,100);
neural_circuit.connect_all_layers(0.5);
neural_circuit.connect_tail_to_head(0.5);
neural_circuit.set_all_layers_random_weights();
neural_circuit.seed_circuit(0.1);
neural_circuit.step_circuit_linear(true);
neural_circuit.display_layer_firing_grids();
neural_circuit.step_circuit_linear();
neural_circuit.display_layer_firing_grids();
neural_circuit.step_circuit_linear_times(50);
neural_circuit.display_layer_firing_grids();

// neural_circuit.display_layer_property_grids('potential');


