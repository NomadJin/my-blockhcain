'use strict'
var CryptoJS = require('crypto-js')
var express = require('express')
var bodyParser = require('body-parser')
var WebSocket = require('ws')

// set exvironment variable
var http_port = process.env.HTTP_PORT || 3001
var p2p_port = process.env.P2P_PORT || 6001
var initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : []

class Block {
    constructor(index, previousHash, timestamp, data, hash) {
        this.index = index
        this.previousHash = previousHash.toString()
        this.timestamp = timestamp
        this.data = data
        this.hash = hash.toString()
    }
}

function getGenesisBlock(){
    return new Block(0, "", 1535165503, "Genesis block", "a12eab42aa059b74b1ee08310a88b56e64c3d90cf803445250dc2f209833d6d2");
}

var blockchain = [getGenesisBlock()]

var sockets = []
var MessageType = {
    QUERY_LATEST: 0,
    QUERY_ALL: 1,
    RESPONSE_BLOCKCHAIN: 2
}

function initHttpServer() {

}

function initP2PServer() {

}

function initConnection() {

}

function initMessageHandler() {

}

function initErrorHandler() {

}

function generateNextBlock() {

}

function calculateHashForBlock() {

}

function calculateHash() {

}

function addBlock() {

}

function isValidNewBlock() {

}

function connectToPeers() {

}

function handleBlockchainRespose() {

}

function replaceChain() {

}

function isValidChain() {

}

function getLatestBlock() {

}