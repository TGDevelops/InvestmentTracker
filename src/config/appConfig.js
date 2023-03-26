const config = {
    services: {
        baseUrl: {
            "local": "https://localhost:8080",
            "prod": ""
        },
        endpoints: {
            "ADD_INVESTMENT": "/investments/add",
            "UPDATE_INVESTMENT": "/investments/update",
            "DELETE_INVESTMENT": "/investments/delete"
        }
    }
}
export default config;