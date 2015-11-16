# weChat

Chat with your friends on this online application that uses socket.io for fast, instantaneous communication!

## Getting Set Up

[Master Branch](https://github.com/territorialFerry/weChat/tree/feat/deploy) - development

[Feat/Deploy](https://github.com/territorialFerry/weChat/tree/master) - deployment

#### Node Modules

After forking over this project and cloning it down to your machine, install necessary Node modules with the following command: 

<code>npm install</code>

#### Node Version

This application uses Node v4.0.0. To check your current Node version, run: 

<code>node -v</code>

If you do are not using v4.0.0, we will be using Node Version Manager (nvm) to switch between different versions. 

```
npm install -g nvm

nvm install v4.0.0

nvm use v4.0.0
```

Check your node version again with <code>node -v</code> and you should be running v4.0.0. 

#### MySQL Database

To install MySQL to your dev environment, run the following commands (Linux/Mac): 

```
sudo apt-get install mysql-server
brew install mysql
```

During installation, you can set up various users/passwords. For the current state of this application, usernames and passwords will not be required. 

#### MySQL Database Setup

There is one database called 'wechat'. In that database, there will be two tables 'userpassword' and 'messages'. Run the following command to set it up along with an initial room: 

```
gulp
```

You can also drop the database with this command: 

```
gulp deleteDB
```

#### Running your environment

I prefer to use nodemon to run my server versus plain vanilla node. Install nodemon with <code>npm install -g nodemon</code>. After installation, you can run your server with: 

```
nodemon index.js
```

#### Deployment Environment

My project organization (Territorial Ferry) deployed on Digital Ocean. Please contact me for details to access the server. 

## Contact

[LinkedIn](https://www.linkedin.com/in/vokoshyv)

[GitHub](https://github.com/vokoshyv)

[AngelList](https://angel.co/aaron-ron-tsui)