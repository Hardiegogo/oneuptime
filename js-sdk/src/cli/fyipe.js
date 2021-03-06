#!/usr/bin/env node
const { version } = require('../../package.json');
const program = require('commander');
program
    .name('fyipe')
    .version(version, '-v, --version')
    .description('Fyipe SDK');

program.command('server-monitor [options]', 'Fyipe Monitoring shell', {
    executableFile: __dirname + '/server-monitor/bin/index',
});

program.parse(process.argv);
