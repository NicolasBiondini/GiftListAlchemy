const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?

  const merkleTree = new MerkleTree(niceList);
  // get the root
  const root = merkleTree.getRoot();

  // Person on the list
  const name = "Sidney Kertzmann";

  // Person not on the list
  //const name = "Nicolas Biondini";

  const index = niceList.findIndex((n) => n === name);
  const proof = merkleTree.getProof(index);
  console.log(proof);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name,
  });

  console.log({ gift });
}

main();
