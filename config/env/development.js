module.exports = {
    // This is your MYSQL Database configuration
    db: {
        name: 'mean',
        password: '',
        username: 'root',
        host:'localhost',
        port:3306
    },
    app: {
        name: 'M*EAN Stack - Development'
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
