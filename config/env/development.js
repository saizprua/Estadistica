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
        password: 'PWticket2009',
        username: 'jsena',
        host:'10.252.75.114',
        port:3306
    },
    app: {
        name: 'M*EAN Stack - Development'
    },

    ldap: {
        server: {
            url: 'ldap://zeus.innovacion.net:389',
            connectTimeout: Infinity,
            idleTimeout: Infinity
        },
        authMode: 0,
        debug: false,
        authOnly: false,
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
