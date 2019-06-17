# Common settings
URL_PREFIX = "api"


# CORS settings
X_DOMAINS = ["http://127.0.0.1:3000", "http://localhost:3000"]
X_HEADERS = ["Content-Type"]

# Disabling concurrency control
ENFORCE_IF_MATCH = False

# Models
DOMAIN = {
    "items": {
        "schema": {
            "name": {
                "type": "string",
                "required": True,
                "minlength": 1,
                "maxlength": 200,
            },
            "checked": {"type": "boolean", "default": False},
        }
    }
}
RESOURCE_METHODS = ["GET", "POST", "DELETE"]
ITEM_METHODS = ["GET", "PATCH", "PUT", "DELETE"]

# MongoDB connection
MONGO_HOST = "localhost"
MONGO_PORT = 27017
MONGO_DBNAME = "shopping"
