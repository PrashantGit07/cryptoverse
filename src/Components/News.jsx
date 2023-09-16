import React, { useState } from 'react'
import { useGetCryptosNewsQuery } from '../services/cryptoNews'
import moment from 'moment/moment'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
const { Title, Text } = Typography
const { Option } = Select
const News = ({ simplified }) => {
  const[newsCategory , setNewsCategory] = useState("Cryptocurrency")
  const { data: cryptoNews } = useGetCryptosNewsQuery({ newsCategory , count: simplified ? 7 : 20 })
  console.log(cryptoNews);
  const { data } = useGetCryptosQuery(100)
  if (!cryptoNews || !cryptoNews.value) {
    return null;
  }

  const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
  return (

    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
          showSearch
          className='select-news'
          placeholder="Select a Crypto"
          optionFilterProp='children'
          onChange={(value)=> setNewsCategory(value)}
          filterOption={(input , option)=>option.children.toLowerCase().indexOf(input.toLowerCase())>=0}
          >
            <Option value="Cryptocurrency">Cryptocurrecny</Option>
            {data?.data?.coins.map((coin)=><Option value={coin.name}>{coin.name} </Option>)}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card className="news-card" hoverable style={{ height: "100%", width: "auto" }}>
            <a className='news-article' target="_blank" href={news.url}  >
              <Title level={4} className='news-title' >{news.name}</Title>
              <img src={news?.image?.thumbnail?.contentUrl || demoImage} />
            </a>

            <p>
              {news.description > 100 ? `${news.description.substring(0, 100)}...` : news.description}
            </p>
            <div className='provider-container'>
              <div>
                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} />
                <Text className='provider-name'>{news.provider[0]?.name}</Text>
              </div>
              <Text>{moment(news.datePublished).startOf('ss').fromNow()} </Text>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News
