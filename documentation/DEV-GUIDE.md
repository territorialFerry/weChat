# Development Guide

All project tools must be compatible between OSX and Linux systems. The standard project tools appear below.

## Sublime Text 3
Sublime Text 3 is the chosen editor for this project. You can use whatever text editor or IDE you choose, however using Sublime Text with the settings described below will make it easier to adhear to project style guide and coding standards.

### Project File (coming)

The project file standardizes a key editor settings between project members. For example, the file sets a default tab size for all new files to '2' and automattically translates all tab input to spaces. Another helpful setting; it displays two verical lines in the editor, the first (60 spaces) marks the border for comments, the second (80 spaces) marks the border code.

### Plugins

Project plugins are seprated to the groups 'suggested', 'linters', and 'themes'. The suggested plugins are optional but strongly recommended for project synchronicity.  The linters are mandatory.  A small amount of study is required ahead of configuration.  Themes are optional but installing at least one of them is recommended, as they will help with linter highlighting, sidebar organization, and more.

#### Suggested Plugins

* Sidebar Enhancements
* DocBlockr
* File​Header
* Markdown Preview
* Alignment
* JavaScriptNext ES6 Syntax
* Bracket Highlighter
* Pretty JSON
* Emmet
* Color Highlighter
* SCSS (text mate bundle)
* Jasmine JS

#### Linter Plugins

Remember to [Read The Docs](http://www.sublimelinter.com/en/latest/index.html) before installing! For information specific to connecting your linters to Sublime Text themes, [check out the usage page](http://www.sublimelinter.com/en/latest/usage.html).

* SublimeLinter
* SublimeLinter-jshint
* SublimeLinter-contrib-scss-lint

### Themes

Themes are optional. Your theme selection is largely a matter of preference. The most useful themes can be combined with linters to present graphic feedback on warnings and errors.  For example, ITG Flat, a project-favorite theme, can be setup inside `Preferences.sublime-settings` to affect Sublime Text's theme and color scheme.

```
{
  "color_scheme": "Packages/User/SublimeLinter/itg.dark (SL).tmTheme",
  "show_color_scheme_info": true,
  "theme": "itg.flat.dark.sublime-theme"
}
```

Territorial Ferry's list of favorite themes appears below:

* [ITG Flat](http://itsthatguy.com/post/70191573560/sublime-text-theme-itg-flat)
* [Farzer](http://devthemez.com/farzher)
* [Spacegray](http://kkga.github.io/spacegray/)
* [Afterglow](http://yabatadesign.github.io/afterglow-theme/)


### ZSH

ZSH is an command line terminal with powerful capabilities. It comes from bash, ksh, and tcsh. Installation of this command line terminal is optional. 

## Getting Set Up

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

```

#####Deployment Environment

My project organization (Territorial Ferry) deployed on Digital Ocean. Please contact me for details to access the server. 