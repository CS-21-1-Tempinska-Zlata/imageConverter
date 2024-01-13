import AzureStorageBlob from '@azure/storage-blob';

const connectionString = 'AccountName=devstoreaccount1;AccountKey=Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==;DefaultEndpointsProtocol=http;BlobEndpoint=http://127.0.0.1:10000/devstoreaccount1;QueueEndpoint=http://127.0.0.1:10001/devstoreaccount1;TableEndpoint=http://127.0.0.1:10002/devstoreaccount1;'


export const upload = async (buffer, bufferSize, fileName) => {
    const blobClient = AzureStorageBlob.BlobServiceClient.fromConnectionString(connectionString);
    
    const containerName = "images";

    const containerClient = blobClient.getContainerClient(containerName);

    const blobName = `${Date.now()}-${fileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(buffer, bufferSize);

    return blockBlobClient.url;
}

export const download = async (blobName) => {

    const blobServiceClient = AzureStorageBlob.BlobServiceClient.fromConnectionString(connectionString);

    const containerName = "images";

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blockBlobClient = containerClient.getBlobClient(blobName);

    const timestamp = Date.now();    
    const fileName = `${timestamp}-${blobName}`;
    await blockBlobClient.downloadToFile(fileName);
    return fileName;
    
}