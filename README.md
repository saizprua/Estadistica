
Estadisticas AIG
=====================

## Tecnologias

<dl class="dl-horizontal">
<dt>Mysql</dt>
<dd>Is a relational database management system (RDBMS) in July 2013, it was the world's second most widely used RDBMS, and the most widely used open-source RDBMS.</dd>
<dt>Express</dt>
<dd>The best way to understand express is through its Official Website, particularly The Express Guide; you can also go through this StackOverflow thread for more resources.</dd>
<dt>AngularJS</dt>
<dd>Angular's Official Website is a great starting point. CodeSchool and google created a <a href="https://www.codeschool.com/courses/shaping-up-with-angular-js">great tutorial</a> for beginners, and the angular videos by <a href="https://egghead.io/">Egghead</a>.
Utilice Angular <a href="https://github.com/johnpapa/angular-styleguide">Style Guide</a> and best practice make by Jhon Papa </dd>
<dt>Node.js</dt>
<dd>Start by going through Node.js Official Website and this StackOverflow thread, which should get you going with the Node.js platform in no time.</dd>
</dl>

### Herramientas adicionales
* <a href="http://docs.sequelizejs.com/en/latest/">Sequelize</a> - Es un ORM basado en la promesa para Node.js Es compatible con los dialectos de PostgreSQL , MySQL,
MariaDB , SQLite y MSSQL y cuenta con soporte de transacciones sólida , las relaciones , leer replicación y
Más.
* <a href="http://passportjs.org/">Passport</a> - Un middleware de autenticación para Node.js que admite la autenticación mediante un nombre de usuario y contraseña (LDAP).
* <a href="http://getbootstrap.com/">Twitter Bootstrap</a> - ( HTML , CSS y JS ) El framework más popular para el desarrollo frontend.


## Prerequsistos
- Node.js (>= 0.10.x && <= 4.2.x) [https://nodejs.org](https://nodejs.org/) 
- MySQL Base de datos
- Nginx Proxy

## Herramientas de prerequeisitos

```bash
$ npm install -g bower
$ npm install -g grunt
$ npm install -g pm2 
```

## Instalación dev

Clonar el repositorio en la maquina a desplegar el proyecto

```bash
$ git clone git hub
$ cd mean-relational && npm install
```
- configuracion de bases de datos ```/config/env/development.js```.

```bash
$ grunt
```

Abrir el browser en el puerto 3000 [http://localhost:3000](http://localhost:3000)


## Instalacion CENTOS 7 dev

# Instalar la herramientas de desarrollador
```bash
$ yum groupinstall "Development tools"
```

# Instalar en manejador de versiones de nodejs suporte en [https://github.com/creationix/nvm](nvm github)
```bash
$ yum curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.30.1/install.sh | bash
$ souce ./profile
```

#Instalacion de node y herramientas 

``` bash
$ nvm install 4.2
$ npm install -g bower
$ npm install -g grunt
$ npm install -g pm2
```
Para pm2 leer el documento [https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-centos-7](pm2 deploy production) 

# Instalacion de nginx 

Leer el documento [https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-centos-7](nginx) 

```bash
$setsebool httpd_can_network_connect on -P
```

DOCS
[http://stackoverflow.com/questions/23948527/13-permission-denied-while-connecting-to-upstreamnginx](httpd_can_network_connect)