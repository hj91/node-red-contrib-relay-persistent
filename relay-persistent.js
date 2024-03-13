/**

 node-red-contrib-relay-persistent/relay-persistent.js - Copyright 2024 Harshad Joshi and Bufferstack.IO Analytics Technology LLP, Pune

 Licensed under the GNU General Public License, Version 3.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://www.gnu.org/licenses/gpl-3.0.html

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 **/

const fs = require('fs');

module.exports = function(RED) {
    function RelayPersistentNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        var isEnabled = false; // Variable to track whether the node is enabled or disabled
        var persistentMode = config.persistent || false; // Check if persistent mode is enabled

        // Initialize status
        node.status({ fill: "red", shape: "ring", text: "Disabled" });

        // Function to save state to a text file
        function saveState() {
            const stateData = {
                isEnabled: isEnabled,
                timestamp: new Date().toLocaleString()
            };
            fs.writeFileSync(`${config.name}_state.txt`, JSON.stringify(stateData));
        }

        // Function to load state from a text file
        function loadState() {
            if (fs.existsSync(`${config.name}_state.txt`)) {
                const stateData = JSON.parse(fs.readFileSync(`${config.name}_state.txt`, 'utf8'));
                isEnabled = stateData.isEnabled;
                node.status({ fill: isEnabled ? "green" : "red", shape: isEnabled ? "dot" : "ring", text: isEnabled ? "Enabled" : "Disabled" });
            }
        }

        // Load state if persistent mode is enabled
        if (persistentMode) {
            loadState();
        }

        // Handle incoming messages
        node.on('input', function(msg) {
            // Check if input is true and topic is 'enable'
            if (msg.payload === true && msg.topic === 'enable') {
                isEnabled = true;
                node.status({ fill: "green", shape: "dot", text: "Enabled" });
                if (persistentMode) {
                    saveState();
                }
            }
            // Check if input is false and topic is 'disable'
            else if (msg.payload === false && msg.topic === 'disable') {
                isEnabled = false;
                node.status({ fill: "red", shape: "ring", text: "Disabled" });
                if (persistentMode) {
                    saveState();
                }
            }
            // If node is enabled, allow all messages to pass through
            else if (isEnabled) {
                node.send(msg);
            }
        });
    }
    RED.nodes.registerType("relay-persistent", RelayPersistentNode);
}

