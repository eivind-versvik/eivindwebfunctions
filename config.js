// @ts-check

const config = {
    endpoint: "https://eivinddb.documents.azure.com:443/",
    key: "",
    databaseId: "ToDoList",
    containerId: "Items",
    partitionKey: { kind: "Hash", paths: ["/id"] }
  };
  
  module.exports = config;
