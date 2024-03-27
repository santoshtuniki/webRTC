1.  mkcert create-ca

        Create a Certificate Authority
    
2.  mkcert create-cert

        Create a Certificate Authority

3.  Read keys & certificate from files:

        const fs = require("fs");

        const key = fs.readFileSync("create-cert-key.pem");
       
        const cert = fs.readFileSync("create-cert.pem");

4.  Initialize localhost

        "start": "HTTPS=true  SSL_CRT_FILE=./certs/create-cert.pem  SSL_KEY_FILE=./certs/create-cert-key.pem  react-scripts start",

------

