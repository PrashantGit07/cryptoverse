
import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery } from '../services/cryptoApi';
import { useGetCryptoHistoryQuery } from '../services/cryptoApi';
// import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
// import Loader from './Loader';
import LineChart from './LineChart';

const { Title, Text } = Typography;
const { Option } = Select;
const CryptoDetails = () => {
  const { coinId } = useParams()
  const [timePeriod, setTimePeriod] = useState('7d')
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId)
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod })
  console.log(data)
  const cryptoDetails = data?.data?.coin
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: '24h Volume', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];
  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading'>
        <Title level={2} className="coin-name">
          {data?.data?.coin.name} ({data?.data?.coin?.symbol}) Price
        </Title>
        <p>
          {data?.data?.coin.name} Live Price in US dollors
          View value statistics  , market cap and supply
        </p>
      </Col>
      <Select className="time-period" defaultValue='7d' placeholder="Select a time period" onChange={(value) => setTimePeriod(value)} >
        {time.map((date) => <Option key={date}>{date} </Option>)}
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails?.price)} coinName={data?.data?.coin.name} />
      <Col className='stats-cont'>
        <Col className='coin-value-stats'>
          <Col className='coin-value-stats-heading'>
            <Title level={2} className="coin-value-stats-head">
              {data?.data?.coin.name} Value Statistics
            </Title>
            <p>
              An Overview showing the stats of {data?.data?.coin.name}
            </p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>
                  {icon}
                </Text>
                <Text>
                  {title}
                </Text>
              </Col>
              <Text className='stats-value'>
                {value}
              </Text>
            </Col>
          ))}
        </Col>
        <Col className='other-stats-info'>
          <Col className='coin-value-stats-heading'>
            <Title level={2} className="coin-value-stats-head">
              Other Statistics
            </Title>
            <p>
              An Overview showing the stats of all Cryptocurrencies
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className='coin-stats'>
              <Col className='coin-stats-name'>
                <Text>
                  {icon}
                </Text>
                <Text>
                  {title}
                </Text>
              </Col>
              <Text className='stats-value'>
                {value}
              </Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className='coin-desc-heading'>
            What is {data?.data?.coin.name}
            <br></br>
            {/* {HTMLReactParser(data?.data?.coin?.description)} */}
            {data?.data?.coin?.description}
          </Title>
        </Row>
        <Col className='coin-links'>
          <Title className='coin-details-heading' level={3}>
            {data?.data?.coin.name} Links
          </Title>
          {cryptoDetails?.links.map((link) => (
            <Row className='coin-link' key={link.name} >
              <Title className='link-name' level={5}>
                {link.type}
              </Title>
              <a href={link.url} target='_blank' rel='noreferer'>
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails
