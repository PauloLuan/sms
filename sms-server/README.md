## SMS-server API

About the application:

- The server side of the SMS application.

## How to run

## Installing NODEJS

### Linux

You must have to use [nodejs](http://nodejs.org/) version 0.10.x. If you not have node on your machine, just put the following code into your terminal as a root (assuming that you're using Linux), it will install and configure the NodeJS by the [NVM (Node Version Manager)](https://github.com/creationix/nvm)

    # log as sudo
    sudo su

    # update system
    apt-get update && apt-get upgrade -y

    # download and configure Node Version Manager
    wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.20.0/install.sh | bash && \
    source ~/.nvm/nvm.sh && \
    nvm install stable && nvm use stable && nvm alias default stable && \
    node -v

    # updates your ~/.bashrc
    echo -e '\n# NODEJS configs \nexport NODE_ENV=development \nsource ~/.nvm/nvm.sh' >> ~/.bashrc && source ~/.bashrc

### Windows

If your are using windows, install nodejs by [chocolatey](https://chocolatey.org/) (It will be very simple, it looks like an apt-get for windows).

### Install the project dependencies:

    npm install

### Install Nodemon dependencie as a global app:

Nodemon will watch the files in the directory in which nodemon was started, and if any files change, nodemon will automatically restart the application.

    npm install -g nodemon

### you could run the program by the following ways:

    npm start           # recomended way :)
    node bin/www
    node-debug bin/www  # to debug the application using chrome
    nodemon bin/www     # It is the same as npm start

### Running the tests:

To run the tests, just run [mocha](http://mochajs.org/).

    ./node_modules/mocha/bin/mocha

Or, just install as a global app `npm install -g mocha` and run `mocha`

## Sending requests

You can use CURL to send post requests to the API as well:

    curl -X POST 'http://localhost:4000/sms/text' \
        -d 'text=TESTE DE MESA'

Another good alternative is to use [postman](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm) to send the requests.