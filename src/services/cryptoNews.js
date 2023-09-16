
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


    const cryptoNewsApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'b181fbe685msh4d2e61ed1f997dfp1df711jsn41a5ad53aca1',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
    }

    const baseUrl = 'https://bing-news-search1.p.rapidapi.com/news'

    const createRequest = (url) => ({ url, headers: cryptoNewsApiHeaders }); // Fix the 'url' typo and 'Headers' typo

    export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptosNews: builder.query({
        query: ({newsCategory, count}) => createRequest(`/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
    })

    export const {
        useGetCryptosNewsQuery,
    
    } =  cryptoNewsApi;
 