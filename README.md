# Tunnel Server

Creates a very basic tunnel using [pghalliday's tls-tunnel](https://github.com/pghalliday/tls-tunnel).

## Configuring

Install the tls-tunnel node module:

    npm install tls-tunnel

Next you'll need to generate some keys / certs:

    cp -r node_modules/tls-tunnel/keys ./keys
    cd keys
    # now edit keys/extensions.cnf with your server info
    ./keys.sh
    
Your client will need to use these certs to authenticate.

## Run it

    node app.js
    
or, in the bg:

    nohup node app.js &

## TODO

- implement basic http authentication
