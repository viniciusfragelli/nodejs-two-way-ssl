# Nodejs Two Way SSL

Create certificate, CA, Server, Client

CA Certificate:
```
openssl genrsa -des3 -out ca.key 2048
openssl req -new -x509 -days 365 -key ca.key -out ca.crt
```

Server certificate:
```
openssl genrsa -out server.key 1024
openssl req -new -key server.key -out server.csr
openssl x509 -req -in server.csr -out server.crt -CA ca.crt -CAkey ca.key -CAcreateserial -days 365
```

Client certificate:
```
openssl genrsa -out client.key 1024
openssl req -new -key client.key -out client.csr
openssl x509 -req -in client.csr -out client.crt -CA ca.crt -CAkey ca.key -CAcreateserial -days 365
```

Configuration in node bin/www.js:
```node
var options = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
  ca: [ fs.readFileSync('./ca.crt') ],
  passphrase: 'testecert',
  requestCert: true,
  rejectUnauthorized:true,
  agent: false
}
```
Request in Postman

![github-small](https://raw.githubusercontent.com/viniciusfragelli/nodejs-two-way-ssl/master/images/request%20postman.jpg)
![github-small](https://raw.githubusercontent.com/viniciusfragelli/nodejs-two-way-ssl/master/images/request%20postman2.jpg)

