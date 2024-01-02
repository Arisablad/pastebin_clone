/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')();
const nextConfig = {};

module.exports = removeImports({
  experimental: { esmExternals: true },
});
module.exports = nextConfig;
