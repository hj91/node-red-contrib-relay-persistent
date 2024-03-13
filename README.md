# Node-RED Contrib Relay Persistent

This Node-RED node allows you to create a relay with persistent mode. It enables you to control the flow of messages based on incoming signals while maintaining the state of the relay even after Node-RED restarts.

## Installation

You can install this node using the Node-RED Palette Manager or by running the following npm command in your Node-RED user directory:

```
npm install node-red-contrib-relay-persistent
```

## Usage

Once installed, you can find the "Relay Persistent" node in the function category of the Node-RED palette.

### Configuration

- **Name**: Name for the relay node.
- **Persistent**: Enable persistent mode to maintain the state of the relay even after Node-RED restarts.

### Input Messages

- **Payload**: `true` or `false` to enable or disable the relay.
- **Topic**: Set to `enable` to enable the relay or `disable` to disable it.

### Output Messages

If the relay is enabled, all incoming messages are passed through.

## State file location

The state file will be stored in the same directory where the Node-RED instance is running

Example of state file content will be a json one line

{"isEnabled":true,"timestamp":"13/3/2024, 6:39:21 pm"}

## Use Cases

- **Home Automation**: Control lights, fans, or other devices based on sensor inputs or user commands while ensuring the state persistence across Node-RED restarts.
- **Industrial Automation**: Manage equipment operations and status using relay nodes with persistent mode to ensure reliability and continuity of operations.
- **IoT Applications**: Implement power management solutions for IoT devices, enabling efficient energy usage and device control with persistent relay states.

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).

## Issues and Feedback

If you encounter any issues or have any feedback, please [open an issue](https://github.com/hj91/node-red-contrib-relay-persistent/issues) on GitHub.

