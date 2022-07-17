const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "https://modulo-8-3fb82.web.app/*", //servidor que deseas que consuma o (*) en caso que sea acceso libre
                    credentials: true
                }
            ]
        }
    }
}