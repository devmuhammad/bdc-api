
# Bureau De Change (API/BACKEND)

FOREX TRADERS MANAGER DOCUMENTATION (BDC) 
 
1.1 Purpose of Document:

This document is a documentation of the above-mentioned software application developed for Comsoft Ltd in 2018.

1.2 Application Overview:

BDC is a FX trading management platform for “Bureau de change” operators to record and manage inflow and outflow of currencies and exchanges accurately.

1.3 Scope:

The scope of this development was to create backend APIs of the BDC application. The system was built on the following modules:
• Authentication
• Dashboard & reports
• Sales & purchases
• User Manager & Settings

1.4 Tools:

BDC backend was built using NodeJs (Express Js) with typescript and deployed on the an heroku server.
Other dependencies & plugins can be found in the package.json file. It was developed using the IDE - Visual studio code.

1.5 Coding Structure:

The back-end code was structured with MVC with Models, Views, Controllers and Routers. It also includes middleware to verify all incoming requests.

1.6 Build Commands:

Start: “npm start”
Deployment:  project is deployed with pm2 on the server or batch script.

1.7 Repository:

Url: https://github.com/devmuhammad/bdc-api.git
Branch: master

1.8 API/Endpoints
Production: http://BaseURL/cabsolbdc/api/v1/ Development: http://localhost:3000/cabsolbdc/api/v1/
   
