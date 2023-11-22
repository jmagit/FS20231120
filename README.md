# Curso de fullstack: Node y Angular 17

## Instalaciones

- [Git](https://git-scm.com/)
- [NVM for Windows](https://github.com/coreybutler/nvm-windows/releases)
- [Node.js LTS](https://nodejs.org)
- [Angular DevTools](https://chrome.google.com/webstore/detail/angular-devtools/ienfalfjdbdpebioblfackkekamfmbnh)
- [Visual Studio Code](http://code.visualstudio.com/)

## Extensiones Visual Studio Code

- [Spanish Language Pack for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-es)
- [Angular Essentials](https://marketplace.visualstudio.com/items?itemName=johnpapa.angular-essentials)
- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
- [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) + [Spanish - Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-spanish)
- [IntelliSense for CSS class names](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion)
- [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
- [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
- [OpenAPI (Swagger) Editor](https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi)
- [Node Essentials](https://marketplace.visualstudio.com/items?itemName=afractal.node-essentials)

## Servidores en Docker

### Bases de datos

    docker run -d -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=P@$$w0rd" -p 1433:1433 -v %cd%\backup:/backup --name mssql2022 mcr.microsoft.com/mssql/server:2022-latest
    docker run -d --name mysql-sakila -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 jamarton/mysql-sakila
    docker run -d --name mongodb -p 27017:27017 mongo

### Bases de datos de ejemplos

- https://github.com/Microsoft/sql-server-samples/releases/download/adventureworks/AdventureWorksLT2022.bak
- https://github.com/Microsoft/sql-server-samples/releases/download/adventureworks/AdventureWorks2022.bak
- https://github.com/Microsoft/sql-server-samples/releases/download/adventureworks/AdventureWorksDW2022.bak

### Instalación de bases de datos de ejemplos

Con backup:

    /opt/mssql-tools/bin/sqlcmd \
        -S localhost \
        -U SA \
        -P $MSSQL_SA_PASSWORD \
        -Q "RESTORE DATABASE [AdventureWorksLT2022] FROM  DISK = N'/backup/AdventureWorksLT2022.bak' WITH  FILE = 1,  MOVE N'AdventureWorksLT2022_Data' TO N'/var/opt/mssql/data/AdventureWorksLT2022.mdf',  MOVE N'AdventureWorksLT2022_Log' TO N'/var/opt/mssql/data/AdventureWorksLT2022_log.ldf',  NOUNLOAD,  STATS = 5"

Con scripts:

    /opt/mssql-tools/bin/sqlcmd \
        -S localhost \
        -U SA \
        -P $MSSQL_SA_PASSWORD \
        -i /backup/cursos-mssql.sql \
        -i /backup/sql-server-sakila-schema.sql \
        -i /backup/sql-server-sakila-insert-data.sql

## Angular Command Line Interface

    npm install -g nodemon express-generator @nestjs/cli @angular/cli
    ng version

## Servidor REST

    git clone https://github.com/jmagit/MOCKWebServer.git MOCKWebServer
    cd MOCKWebServer
    npm i
    npm start

## Documentación

- [Oficial: Node.js](https://nodejs.org/en/learn)
- [Oficial: Angular](https://angular.io/docs)
- [Oficial: Angular](https://angular.dev)
