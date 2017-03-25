#!/usr/bin/env node

const kafka = require('kafka-node');

const mod_name = process.env['MOD_NAME'];
const func_handler = process.env['FUNC_HANDLER'];
const topic_name = process.env['TOPIC_NAME'];

const mod_path = `/kubeless/${mod_name}.js`

var mod = null;

function import_module() {
    try {
        mod = require(mod_path);
    } catch (err) {
        console.log(`No valid module found for ${func_handler}, Failed to import module`);
    }
}

function consume(kafkaServer, clientId, topic, func) {
    const client = kafka.Client(kafkaServer, clientId);
    const consumer = new kafka.Consumer(client, [ {topic} ]);
    consumer.on('message', (msg) => {
        console.log(func(msg));
    })
}

function parse_json_safe(str) {
    try {
        var data = JSON.parse(str);
        return { type: 'json', payload: data }
    } catch(e if e instanceof SyntaxError) {
        return { type: 'text', payload: msg }
    }
}

consume('kafka.kubeless:9092', `kubeless-${mod_name}`, topic_name, mod[func_handler]);
