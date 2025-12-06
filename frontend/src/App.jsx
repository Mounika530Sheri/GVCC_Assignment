import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function App(){
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)
  const [limit] = useState(8)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    fetchProducts()
  }, [search, category, page])

  async function fetchProducts(){
    const params = { search, category, page, limit }
    try{
      const res = await axios.get('/api/products', { params })
      setProducts(res.data.products || [])
      setTotal(res.data.total || 0)
    }catch(e){
      console.error(e)
      alert('Could not fetch products. Make sure backend is running on port 3001 and proxy is configured.')
    }
  }

  const categories = Array.from(new Set(products.map(p=>p.category))).filter(Boolean)

  return (
    <div className="container">
      <h1>Product Showcase</h1>
      <div className="controls">
        <input placeholder="Search..." value={search} onChange={e=>{setSearch(e.target.value); setPage(1)}} />
        <select value={category} onChange={e=>{setCategory(e.target.value); setPage(1)}}>
          <option value="">All categories</option>
          {categories.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="grid">
        {products.map(p=>(
          <div className="card" key={p.id}>
            <img src={p.image_url || '/images/placeholder.png'} alt={p.name} />
            <h3>{p.name}</h3>
            <p className="short">{p.short_desc}</p>
            <p className="price">₹{p.price}</p>
            <Link to={`/product/${p.id}`} className="btn">View</Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</button>
        <span>Page {page}</span>
        <button onClick={()=>setPage(p=>p+1)} disabled={products.length < limit}>Next</button>
      </div>
    </div>
  )
}