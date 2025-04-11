module.exports = {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-private-methods'
    ],
    ignore: [/node_modules\/(?!chart.js)/] // <- Yeh line add karo
  };
  