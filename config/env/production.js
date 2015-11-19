module.exports = {
    // This is your MYSQL Database configuration
    db: {
        name: 'estadistica',
        password: '1234',
        username: 'gene',
        host:'localhost',
        port:3306
    },
    db_inn: {
        name: 'gerencia_innovacion',
        password: '1nn0v4$$',
        username: 'innovacion',
        host:'10.252.75.126',
        port:3306
    },
    app: {
        name: 'MEAN - A Modern Stack - Production'
    },
    ldap: {
        server: {
            url: 'ldap://zeus.innovacion.net:389'
        },
        authMode: 0,
        debug: false,
        authOnly: true,
        usernameField: 'username',
        passwordField: 'password',
        base: 'ou=Secretaria de Innovacion, dc=innovacion, dc=net',
        search: {
            filter: '(sAMAccountName=$uid$)',
            scope: 'sub',
            sizeLimit: 1

        },
        searchAttributes: ['displayName']
    }
};
