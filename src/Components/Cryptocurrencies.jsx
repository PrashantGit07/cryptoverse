import React, { useEffect, useState } from 'react'
import millify from 'millify'
import { Link, useNavigate } from 'react-router-dom'
import { Card , Row , Col , Input } from 'antd'

import { useGetCryptosQuery } from '../services/cryptoApi'
const Cryptocurrencies = ({simplified}) => {
  const count = simplified?10:100
  const{data:cryptoList , isFetching} = useGetCryptosQuery(count);
  const[cryptos , setCryptos] = useState()
  const[name , setName] = useState('')
  const navigate = useNavigate();

 

  useEffect(()=>{
    const filterdata = cryptoList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(name.toLowerCase()))
    setCryptos(filterdata)
  } , [cryptoList , name])
  console.log(cryptos)
  return (
    <div>
      {!simplified &&(
        <div className="search-name">
            <Input placeholder='Search Cryptocurrency' onChange={(e) => setName(e.target.value)} />

        </div>
      )}
       <Row gutter={[32,  32]} className="crypto-card-container">
        {
          cryptos?.map((currency)=>(
            <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid} >
              <Link to={`/crypto/${currency.uuid}`}>
                <Card
                 title={`${currency.rank}. ${currency.name}`}
                 extra={<img className="crypto-img" src={currency.iconUrl} style={{ width: '50px', height: '50px' }}/>}
                 hoverable
                 
                >
                  <p>Price : {millify(currency.price)}</p>
                  <p>Market Cap : {millify(currency.marketCap)}</p>
                  <p>Daily Change : {millify(currency.change)}</p>
                </Card>
              </Link>
            </Col>
          ))
        }
       </Row>
    </div>
  )
}

export default Cryptocurrencies
