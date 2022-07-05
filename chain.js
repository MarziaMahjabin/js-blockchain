// Get the sha256 hash function.
const crypto = require("crypto"), SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");

class Block {
    constructor(timestamp = "", data = []) {
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.getHash();
        this.prevHash = ""; // previous block's hash
    }

    // Our hash function.
    getHash() {
        return SHA256(this.prevHash + this.timestamp + JSON.stringify(this.data));
    }
}


class Blockchain {
  constructor() {
    // Create our genesis block
    this.chain = [new Block(Date.now().toString())];
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(block) {
    // Since we are adding a new block, prevHash will be the hash of the old latest block
    block.prevHash = this.getLastBlock().hash;
    // Since now prevHash has a value, we must reset the block's hash
    block.hash = block.getHash();

    // Object.freeze ensures immutability in our code
    this.chain.push(block);
  }

  isValid(blockchain = this) {
        // Iterate over the chain, we need to set i to 1 because there are nothing before the genesis block, so we start at the second block.
        for (let i = 1; i < blockchain.chain.length; i++) {
        const currentBlock = blockchain.chain[i];
        const prevBlock = blockchain.chain[i - 1];

        // Check validation
        if (
          currentBlock.hash !== currentBlock.getHash() ||
          currentBlock.hash !== prevBlock.prevHash
        ) {
          return false;
        }
        }

        return true;
    }
}

const MyChain = new Blockchain();
// Add a new block
MyChain.addBlock(
  new Block(Date.now().toString(), { from: "John", to: "Bob", message: "hi" })
);
MyChain.addBlock(
  new Block(Date.now().toString(), { from: "John", to: "Bob", message: "hell" })
);
// (This is just a fun example, real cryptocurrencies often have some more steps to implement).

// Prints out the updated chain
console.log(MyChain.chain); 





