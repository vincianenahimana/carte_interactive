Data structure
|-- README.md
|-- config
|   `-- db.mjs               # Database configuration (DB connection settings)
|-- controllers
|   `-- geoController.mjs     # Logic to handle requests, interact with models, and format the response
|-- models
|   `-- geoModel.mjs          # Interact with data (database or files like geojson)
|-- routes
|   `-- geoRoute.mjs          # Define API routes and connect them to the controller
|-- views
|   `-- geoView.mjs           # Format and structure the response (optional, can be integrated into controllers)
|-- data
|   `-- taux_chomage_15_64.geojson
|-- script
|   `-- importGeojson.mjs     # Script for data import, could also move this into models if it's part of business logic
|-- index.mjs                 # Main entry point of your application
|-- package-lock.json
|-- package.json
