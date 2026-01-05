import { sharing } from "@rspack/core";
import EmitManifest from './EmitManifest';

const mfConfig = {
  "name": "@vmok-perf/shared-treeshake-host",
  "library": {
    "type": "global"
  },
  "manifest": true,
  "shared": {
    "antd": {
      "requiredVersion": "6.1.0",
      "version": "6.1.0",
      "treeshake": {
        "usedExports": [
          "Badge",
          "Button",
          "List"
        ],
        "strategy": "server"
      }
    },
    "react": {
      "requiredVersion": "18.2.0",
      "version": "18.2.0"
    },
    "react-dom": {
      "requiredVersion": "18.2.0",
      "version": "18.2.0"
    }
  }
};

module.exports = {
  entry: './index.ts',
  plugins: [
    new EmitManifest(),
    new sharing.TreeShakeSharedPlugin({
      reshake: true,
      mfConfig,
    }),
  ]
};
