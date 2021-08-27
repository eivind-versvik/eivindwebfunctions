// @ts-check

const config = {
    endpoint: "https://eivinddb.documents.azure.com:443/",
    key: "K14oYzFZjKaVGg2UF20BqYzFqF9Rz3ycxRNpgzicPv2HiAykS0az4zzc2OSYpAzJBAxmma8J68PuE7nfnG4sLw==",
    databaseId: "ToDoList",
    containerId: "Items",
    partitionKey: { kind: "Hash", paths: ["/id"] }
  };
  
  module.exports = config;
