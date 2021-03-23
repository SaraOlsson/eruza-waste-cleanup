import React, { useState, useEffect } from 'react'
import httpClient from './HttpClient.ts'
import { readContainerContent } from './services/azure-storage-blob.ts';

const EventImages = () => {

    const [blobList, setBlobList] = useState([]);

    useEffect(() => {

        console.log(process.env)
        GetBlobs()
        
        
    }, [])

    const GetBlobs = async (path_prefix = '') => {

        // *** UPLOAD TO AZURE STORAGE ***
        const blobsInContainer = await readContainerContent();

        // prepare UI for results
        setBlobList(blobsInContainer);
    }

    const GetTaggingOptions = async (path_prefix = '') => {

        console.log('getDbFolders')
        const data = await httpClient.get('GetTaggingOptions?code=BSvD84Vk9hB6eAL12/XWimYE9Ah/PnyazRlO5vHx/DBcNiMgC56CRg==&containerName=image-database')
        
        console.log(data)
    }

    // display file name and image
    const DisplayImagesFromContainer = () => (
        <div>
        <h2>Event images</h2>
        <div>
            {blobList.map((item) => {
            return (
                <div key={item}>
                {/* {Path.basename(item)} */}
                <br />
                <img src={item} alt={item} height="200" style={{maxWidth: '100%', objectFit: 'cover'}} />
                <br />
                </div>
            );
            })}
        </div>
        </div>
    );

    return (
        <>
            {DisplayImagesFromContainer()}
        </>
    )

}

export default EventImages