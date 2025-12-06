import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

export default function ProductDetails(){
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  useEffect(()=>{ fetchProduct() }, [id])

  async function fetchProduct(){
    try{
      const res = await axios.get(`/api/products/${id}`)
      setProduct(res.data)
    }catch(e){
      console.error(e)
      alert('Product not found')
      navigate('/')
    }
  }

  function validate(){
    const errs = {}
    if(!form.name) errs.name = 'Name required'
    if(!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required'
    if(!form.message) errs.message = 'Message required'
    setErrors(errs)
    return Object.keys(errs).length===0
  }

  async function submit(e){
    e.preventDefault()
    if(!validate()) return
    try{
      await axios.post('/api/enquiries', { product_id: Number(id), ...form })
      alert('Enquiry submitted — thank you!')
      setForm({ name:'', email:'', phone:'', message:'' })
    }catch(err){
      console.error(err)
      alert('Submission failed')
    }
  }

  if(!product) return <div>Loading...</div>

  return (
    <div className="container">
      <button onClick={()=>navigate(-1)} className="back">← Back</button>
      <div className="detail">
        <img src={product.image_url || '/images/placeholder.png'} alt={product.name} />
        <div>
          <h2>{product.name}</h2>
          <p className="long">{product.long_desc}</p>
          <p className="price">₹{product.price}</p>
        </div>
      </div>

      <h3>Enquire about this product</h3>
      <form onSubmit={submit} className="form">
        <label>Name <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></label>
        {errors.name && <div className="err">{errors.name}</div>}
        <label>Email <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /></label>
        {errors.email && <div className="err">{errors.email}</div>}
        <label>Phone <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></label>
        <label>Message <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} /></label>
        {errors.message && <div className="err">{errors.message}</div>}
        <button type="submit" className="btn">Submit Enquiry</button>
      </form>
    </div>
  )
}