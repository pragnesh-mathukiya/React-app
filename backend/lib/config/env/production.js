module.exports = {
    environment: 'production',
    port: 5001,
    protocol: 'https',
    TAG: "production",
    mongo: {
        dbName: process.env.dbName,
        dbUrl: process.env.dbUrl,
        dbReadUrl: process.env.dbReadUrl,
        options: { useNewUrlParser: true }
    },
    isProd: true,


};
