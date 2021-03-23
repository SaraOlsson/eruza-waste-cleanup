import React, { useState, useEffect } from 'react'
import httpClient from './HttpClient.ts'

const UseAPISample = () => {

    useEffect(() => {

        GetTaggingOptions()
        
    }, [])

    const GetTaggingOptions = async (path_prefix = '') => {

        console.log('getDbFolders')
        const data = await httpClient.get('GetTaggingOptions?code=BSvD84Vk9hB6eAL12/XWimYE9Ah/PnyazRlO5vHx/DBcNiMgC56CRg==&containerName=image-database')
        
        console.log(data)
    }

    return (
        <p> Test Component </p>
    )

}

export default UseAPISample