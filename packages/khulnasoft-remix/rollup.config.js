const { dirname } = require("path");

const { getAdapterConfig } = require("../../rollup.utils");

/** @returns {import("rollup").RollupOptions[]} */
module.exports = function rollup() {
  // Since `edge/index.ts` references files above the "edge" dir,
  // rollup ends up outputting files into `dist/edge/edge`, so
  // set the output dir to `dist` instead of `dist/edge`.
  let edgeConfig = getAdapterConfig("khulnasoft-remix", "edge/index.ts");
  edgeConfig.output.dir = dirname(edgeConfig.output.dir);
  return [
    getAdapterConfig("khulnasoft-remix"),
    getAdapterConfig("khulnasoft-remix", "server.ts"),
    getAdapterConfig("khulnasoft-remix", "vite.ts"),
    edgeConfig,
    getAdapterConfig("khulnasoft-remix", "edge/server.ts"),
  ];
};
