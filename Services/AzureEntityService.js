import AzureTables from '@azure/data-tables';
const connectionString = 'AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;'

export const update = async (tableName, partitionKey, rowKey, newData, mergeMode=true) => {
    const tableClient = AzureTables.TableClient.fromConnectionString(connectionString, tableName, {allowInsecureConnection: true});
    const entity = {
        partitionKey,
        rowKey,
        ...newData
    };
    await tableClient.updateEntity(entity, mergeMode ? "Merge" : "Replace");
}