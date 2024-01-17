module.exports = {
    environment: 'staging',
    port: 5001,
    protocol: 'http',
    TAG: "staging",
    mongo: {
        dbName: process.env.dbName,
        dbUrl: process.env.dbUrl,
        dbReadUrl: process.env.dbReadUrl,
        options: { useNewUrlParser: true }
    },
    swagger_port: 80,
    isStag: true,

};
