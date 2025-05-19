import React from 'react'
import Item from '../components/Item'

const Home = () => {
  return (
    <section>
        <div className="gap-8 grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] mx-auto max-w-7xl p-8">
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      </section>
  )
}

export default Home