const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("../config");
const dbContext = require("../databaseContext");

const { endpoint, key, databaseId, containerId } = config;

const client = new CosmosClient({ endpoint, key });

const database = client.database(databaseId);
const container = database.container(containerId);

// Make sure Tasks database is already setup. If not, create it.
dbContext.create(client, databaseId, containerId);

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";


    console.log(`Querying container: Items`);

    // GET ITEMS

    // query to return all items
    const querySpec = {
      query: "SELECT * from c"
    };
    
    // read all items in the Items container
    const { resources: items } = await container.items
      .query(querySpec)
      .fetchAll();
    
    items.forEach(item => {
      console.log(`${item.id} - ${item.data}`);
    });


    // CREATE NEW ITEM
    const newItem = {
        id: "5",
        category: "fun",
        name: "Cosmos DB",
        description: "Complete Cosmos DB Node.js Quickstart ⚡",
        isComplete: false
      };

      /** Create new item
    * newItem is defined at the top of this file
    */
    const { resource: createdItem } = await container.items.upsert(newItem);

    console.log(`\r\nCreated new item: ${createdItem.id} - ${createdItem.description}\r\n`);


    /** Update item
     * Pull the id and partition key value from the newly created item.
     * Update the isComplete field to true.
     */
    const { id, category } = createdItem;

    createdItem.isComplete = true;
    
    const { resource: updatedItem } = await container
    .item(id)
    .replace(newItem);
    
    console.log(`Updated item: ${updatedItem.id} - ${updatedItem.description}`); 
    console.log(`Updated isComplete to ${updatedItem.isComplete}\r\n`);


    /**
     * Delete item
     * Pass the id and partition key value to delete the item
     */
    //const { resource: result } = await container.item(id).delete();
   // console.log(`Deleted item with id: ${id}`);
        


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}