import AzureStorageQueue from '@azure/storage-queue';
const connectionString = 'AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;'

export const createQueueIfNotExists = async (queueName) => {
    const queueServiceClient = AzureStorageQueue.QueueServiceClient.fromConnectionString(connectionString);
    const queueClient = queueServiceClient.getQueueClient(queueName);
    const createQueueResponse = await queueClient.createIfNotExists();
}

export const getMessage = async (queueName) => {
    const queueServiceClient = AzureStorageQueue.QueueServiceClient.fromConnectionString(connectionString);
    const queueClient = queueServiceClient.getQueueClient(queueName);
    return await queueClient.receiveMessages();
} 

export const deleteMessage = async (queueName, messageId, popReceipt) => {
    const queueServiceClient = AzureStorageQueue.QueueServiceClient.fromConnectionString(connectionString);
    const queueClient = queueServiceClient.getQueueClient(queueName);
    return await queueClient.deleteMessage(messageId, popReceipt);
}