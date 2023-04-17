const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestemp, data, previousHash = ''){
        this.index = index;
        this.timestemp = timestemp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestemp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [];
    }

    createGenesisBlock(){
        return new Block(0, '0', "Genesis block", '0');
    }

    getLastestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLastestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let BTC = new Blockchain();
BTC.addBlock(new Block(1, "14/02/23", {amount: 4}));
BTC.addBlock(new Block(1, "15/02/23", {amount: 5}));

console.log(JSON.stringify(BTC, null, 4));