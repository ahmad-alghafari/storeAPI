<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Store.com</h3>

  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Technologies Used</a></li>
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

## About The Project

Store.com is an e-commerce platform designed for showcasing electronic products to visitors. It focuses on providing detailed product information without the ability to make purchases. Administrators benefit from a flexible dashboard to manage base data and monitor system statistics effectively.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Features

### Visitor Features
* Explore electronic products with details such as: Colors, categories, brands, prices, and warranties.
* Non-purchasable interface designed for browsing.

### Admin Features
- Comprehensive dashboard with the following capabilities:
    - Base Data Management: CRUD operations for brands, categories, colors, and tags, each with descriptiveguides.
    - Product Management:
        - Edit product properties like images, descriptions, warranty, tags, and colors.
        - Control product statuses:
            - Availability: Available or Sold Out
            - Visibility: Show or Hide
            - Type: New or Old
    - Monitoring Dashboard: Visualize product counts, updates, and system-wide metrics.

## Technologies Used

- **Backend**
  - [![ASP.NET Core][AspNetCore.com]][AspNetCore-url]
  - [![SQL Server][SqlServer.com]][SqlServer-url]
- **Frontend**
  - [![Angular][Angular.io]][Angular-url]
  - [![Bootstrap][Bootstrap.com]][Bootstrap-url]



## Getting Started

Backend Setup

1. Clone this repository:
```sh
git clone https://github.com/ahmad-alghafari/storeAPI.git  
cd storeAPI/code  
```
2. Open the project in your editor.

3. Open folder
```sh
aspdotnetcore9webapicode
```

4. Update the database connection string in appsettings.json :
```json
"ConnectionStrings": {  
    "DefaultConnection": "Your_SQL_Server_Connection_String"  
} 
```

5. Apply migrations to set up the database:
```sh
dotnet ef database update 
```

6. Run the project:
```sh 
dotnet run
```

Frontend Setup

1. Install Node.js from Node.js official site.
2. Install Angular CLI globally:
```sh
npm install -g @angular/cli 
```
3. Navigate to the frontend project folder:
```sh
cd angular18code 
```

4. Install dependencies:
```sh
npm install
```

5. Start the Angular application:
```sh
ng serve
```












[AspNetCore.com]: https://img.shields.io/badge/ASP.NET%20Core-8.0-blue?style=for-the-badge&logo=.net&logoColor=white
[AspNetCore-url]: https://dotnet.microsoft.com/apps/aspnet

[SqlServer.com]: https://img.shields.io/badge/SQL%20Server-2019-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white
[SqlServer-url]: https://www.microsoft.com/en-us/sql-server

[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/

[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com


