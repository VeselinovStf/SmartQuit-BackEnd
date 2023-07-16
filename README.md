<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>


<!-- PROJECT LOGO -->
<br />
<div align="center">
  
<h1 align="center">BACKEND</h1>
  <p align="center">
    Backend Documentation
    <br />
    
    <br />
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
        <ul>
        <li><a href="#architecture">Architecture</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Reports</summary>
  <ol>
    <li>
      <a href="../__unit_test_reports__/lcov-report/index.html">Unit Tests Reports</a>
    </li>
    <li>
      <a href="../__integration_test_reports__/lcov-report/index.html">Integration Tests Reports</a>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

- Application start up starts in <a href="module-app.html">app.js</a>


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With


* Nodejs

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Architecture

  #### How to Read this Article
  - Main functionalities are groupt at Modules section of documentation, that includes code from different Namaspaces but joint together by the rule of Module and groupt funtionality by one purpose ( name ).
  - Modules represent group of namespaces that acts together.
  - Namespaces groups different js files under dedicated name group. Usualy every namespace represent js file, but the naming conventio of modules groups the together ( ex: app/server app/routes = conponent/related-to-component )
  #### Start-up
  - The start up represented by app.js ( <a href="app_app.html">App Server</a> ) prepares Express for application configuration;
  - Main Application start up at <a href="app_app.html">App Server</a>- server runs in order through initializers and configurations represented from modules that takes Express instance trough and works as:
    - <a href="app_middleware.html">App Midleware</a> Adds all application request Middleware:
      - bodyParser
      - cors - using <a href="env.html">Environment </a> CORS_ORIGIN_ADDRESS
    - <a href="app_security.html">App Security</a> Adds all application request security headers:
      - disable 'x-powered-by
      - contentSecurityPolicy
      - crossOriginEmbedderPolicy
      - crossOriginOpenerPolicy
      - crossOriginResourcePolicy
      - dnsPrefetchControl
      - expectCt
      - frameguard
      - hidePoweredBy
      - hsts
      - ieNoOpen
      - noSniff
      - originAgentCluster
      - permittedCrossDomainPolicies
      - referrerPolicy
      - xssFilter
    - <a href="app_setup.html">App Setup</a> Configures application environments
      - Setups <a href="app-packages_logger.html">Logger</a> and <a href="app-packages_middlewares.html">Exception handling middlewares </a> based on environment
    - <a href="app_server.html">App Server</a> Starts up server and the whole application
      - Set ups <a href="app_routes.html">App Routes</a> that adds all application base routes ( ex: api/product )
      - Connects to <a href="app-packages_db_data-mongodb.html">Database</a>
      - Peerforms Database seed when calls <a href="app-packages_db_seed.html">Seed</a>
      - Runs Application Listener from passed Express as parameter
  - The whole application start up configuration is represented by <a href="module-app.html">App Server</a>, <a href="module-db.html">Database</a>


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started


### Prerequisites


### Installation

1. Create .env file

```
TZ='Europe/Sofia'
MONGO_DB_CONNECTION_STRING="mongodb://root:example@localhost:27017"
MONGO_DB_DATABASE_NAME="BackendDB"
BACKEND_PORT=8090
BACKEND_CORS_ORIGIN_ADDRESS="http://localhost:4200"
BACKEND_RSA_PRIVATE_KEY='jwtRS256.key'
BACKEND_RSA_PUBLIC_KEY='jwtRS256.key.pub'
BACKEND_TOKEN_EXPIRATION_TIME=1000
BACKEND_JWR_REFRESH_EXPIRATION=20000
BACKEND_SALT_ROUND=10
BACKEND_INITIAL_USER_EMAIL='admin@mail.com'
BACKEND_INITIAL_USER_PASSWORD='this12345678Sparta!'
BACKEND_INITIAL_USER_DEVICE_ID='14d078c6-203a-468b-b293-ae02420d6d49'
BACKEND_JWT_ISSUER='Car-Tracker-ORG'
BACKEND_JWT_SUBJECT='admin@mail.com'
BACKEND_JWT_AUDIENCE='http://localhost'
BACKEND_TILES_SERVER_URL='https://b.tile.openstreetmap.de'
BACKEND_ROUTES_SERVER_URL='https://routing.openstreetmap.de/routed-bike/route/v1'
LORA_STATUS_COLLECTION=Status
```

2. Database
   - Db Connection string: postgres://<db_user>:<db_password>@<ip>:<port>/<db_name>
   - export NODE_ENV=development/production/test

3. Generating JWT Auth keys
   - ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
   - openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

- development - npm run dev
- generate documentation - npm run doc

    ### API Endpoints
    - [POST] /api/auth - authentication API - REQUEST { "email": string, "password": string }
    - [POST] /api/refreshtoken - refresh token API - REQUEST { "refreshToken" : string }

    ### Authenticated Endpoints
    - HEADER: Authorization: Bearer <JWT>
    
    - [GET] /api/device - devices API - List all devices
    - [GET] /api/device/:userId - devices API - Get device by userId
    - [GET] /api/location/:deviceID - Location API - Get locations by deviceId ( NUMBER )
    - [POST] /api/initial - Password API - Change Initial Password
    
    ### Base Response Structure
    
    ```
    {
        success: boolean,
        message: string,
        data: object,
        status: int // HTTP STATUS CODE
    }
    ```
    
    ### AUTH Response
    
    ```
    {
        success: boolean,
        message: string,
        data: {
            idToken: string,
            expiresIn: int
        },
        status: int // HTTP STATUS CODE
    }
    ```
    
    ### DEV CONTAINER
    
    - docker build . -t tracaris-backend-dev
    - docker run -p 8080:8080 --network database_tracaris tracaris-backend-dev

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap


- [ ] Add Additional Templates w/ Examples
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

See the [open issues](https://github.com/Ne7WoRK/tracaris/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments


<p align="right">(<a href="#readme-top">back to top</a>)</p>



