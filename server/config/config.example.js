module.exports = {
    application: {
        logLevel: "info", // trace, debug, info, warn, error or fatal
        host: "0.0.0.0",
        port: 3500
    },
    servers: [
        {
            ip: "192.168.1.XX",
            port: 27015,
            password: "astrongpassword",
            default_map: "de_dust2"
        }
    ]
};
