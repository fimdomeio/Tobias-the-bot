Tobias-the-bot
==============

A simple bot framework


The Plan
---------

RFC :P
TOBIAS THE BOT DESIGN PLAN

Bot runs a xmpp client
Settings like username and password are read from a settings file.

1 When it recieves a new message:
Check if it's part of a previous command (value stored on redis for 120 seconds)
Else check if there's any file on commands directory corresponding to the first word of the command

A command can be a node.js script or any command that outputs to stdout
Send text back to user

2 Bot also sends automated messages at specified times
  Also read from a directory???



Dependencies
------------

The following is a list of expected dependencies for the bot

'simple-xmpp' -> for the xmpp. It would be nice if the bot could invite other people.

"redis"       -> For redis

'clog'        -> Colorful console output for your applications in NodeJS. I think we can find a better one

'node-schedule' -> A cron-like and not-cron-like job scheduler for Node. This one is pretty cool. :)


Later we'll probably also need:

"moment"      -> A lightweight javascript date library for parsing, manipulating, and formatting dates.

"sha1"        -> We will need it later if we're going to deal with sensitive information
