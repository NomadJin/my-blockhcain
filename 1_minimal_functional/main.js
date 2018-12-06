'use strict'
var CryptoJS = require('crypto-js')

class Block {
    constructor(index, previousHash, timestamp, data, hash) {
        this.index = index
        this.previousHash = previousHash
        this.timestamp = timestamp
        this.data = data
        this.hash = hash
    }
}

function getGenesisBlock() {
    return new Block(0, "", 1535165503, "Genesis Block", "a12eab42aa059b74b1ee08310a88b56e64c3d90cf803445250dc2f209833d6d2")
}

var blockchain = [getGenesisBlock()]

function generateNextBlock(blockData) {
    var previousBlock = getLatestBlock()
    var nextIndex = previousBlock.index + 1
    var nextTimestamp = new Date().getTime() / 1000
    var nextHash = calculateHash(nextIndex, previousBlock.hash, nextTimestamp, blockData)
    return new Block(nextIndex, previousBlock.hash, nextTimestamp, blockData, nextHash)
}

function calculateHashForBlock(block) {
    return calculateHash(block.index, block.previousHash, block.timestamp, block.data)
}

function calculateHash(index, previousHash, timestamp, data) {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString()
}

// add new block and need a validation
function addBlock(newBlock) {
    if (isValidNewBlock(newBlock, getLatestBlock())) {
        blockchain.push(newBlock)
    }
}

function isValidNewBlock(newBlock, previousBlock) {
    if(previousBlock.index + 1 !== newBlock.index) {
        console.log('invalid index')
        return false
    } else if (previousBlock.hash !== newBlock.previousHash) {
        console.log('invalid previousHash')
        return false
    } else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
        console.log(typeof (newBlock.hash) + ' ' + typeof calculateHashForBlock(newBlock))
        console.log('invalid hash: ' + calculateHashForBlock(newBlock) + ' ' + newBlock.hash)
        return false
    }
    return true
}

function isValidChain(blockchainToValidate) {
    // check a genesisblock is the same
    if (JSON.stringify(blockchainToValidate[0]) !== JSON.stringify(getGenesisBlock())) {
        return false
    }
    var tempBlocks = [blockchainToValidate[0]]
    for (var i = 1; i < blockchainToValidate.length; i++) {
        if(isValidNewBlock(blockchainToValidate[i], tempBlocks[i - 1])) {
            tempBlocks.push(blockchainToValidate[i])
        } else {
            return false
        }
    }
    return true
}


function getLatestBlock() {
    return blockchain[blockchain.length - 1]
}