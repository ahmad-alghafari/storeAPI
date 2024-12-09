<div align="center">
    <img src="images/logo.png" alt="Logo" width="400" height="200">
    <h3 align="center">StoreAPI.com</h3>
</div>


## About The Project

Store.com is an e-commerce platform designed for showcasing electronic products to visitors. It focuses on providing detailed product information without the ability to make purchases. Administrators benefit from a flexible dashboard to manage base data and monitor system statistics effectively.



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










[product-screenshot]: images/products.png


[AspNetCore.com]: https://img.shields.io/badge/ASP.NET%20Core-9.0-blue?style=for-the-badge&logo=.net&logoColor=white
[AspNetCore-url]: https://dotnet.microsoft.com/apps/aspnet

[SqlServer.com]: https://img.shields.io/badge/SQL%20Server-2022-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white
[SqlServer-url]: https://www.microsoft.com/en-us/sql-server

[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/

[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com


