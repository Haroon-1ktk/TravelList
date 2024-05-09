import React, { useState } from 'react'

const App = () => {
  const [items, setItems] = useState([]);

  const handleItems = (item) => {
    setItems(items => [...items, item])
  }
  //deleting
  const hadnleDelete = (id) => {
    setItems(items => items.filter((item) => item.id !== id))
  }
  //packing
  const handlePack = (id) => {
    setItems(items.map(item => item.id == id ? { ...item, packed: !item.packed } : item))
  }
  //clearing list
  const HandleClearlist=()=>{
    const confirmed=window.confirm('Are you sure you want to delete it ?')
    if (confirmed) setItems([])
  }
  return (
    <div className='app'>
      <Logo />
      <Form onAddItem={handleItems} />
      <PackingList
        items={items}
        Deleteitem={hadnleDelete}
        handlePack={handlePack} 
        HandleClearlist={ HandleClearlist}/>
      <Stat items={items} />
    </div>
  )
}

export default App;

function Logo() {
  return <h1>🌴 Far Away 💼</h1>
}
//form
function Form({ onAddItem }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);


  //adding items 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, id: Date.now(), packed: false, quantity };
    onAddItem(newItem)
    console.log(newItem);
    setDescription('')
    setQuantity('')
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3> What do you need for trip</h3>
      <select name="" id="" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (item, i) => i + 1).map(num =>
          <option value={num} key={num}>{num}</option>
        )}
      </select>
      <input type="text" placeholder='Items' value={description}
        onChange={(e) => setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  )
}
function PackingList({ items, Deleteitem, handlePack, HandleClearlist }) {
  const [sortBy,setsortBy]=useState('input')
  //sorting
  let sorteditems;
  //sorting by input
  if(sortBy==='input') sorteditems=items;
  //sorting by description
  if (sortBy === 'description') {
    sorteditems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
}
  //sorting by packing
 if(sortBy==='packed')sorteditems=items.slice().sort((a,b)=>Number(a.packed)-Number(b.packed))
  return (
    <div className='list'>
      <ul>
        {sorteditems.map(item => <Item item={item} key={item.id} Deleteitem={Deleteitem} handlePack={handlePack} />)}
      </ul>
      <div className="actions">
        <select name="" id="" value={sortBy} onChange={(e)=>setsortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={ HandleClearlist}>Clerlist</button>
      </div>
    </div>
  )
}
function Item({ item, Deleteitem, handlePack }) {
  return (
    <li>
      <input type="checkbox"
        value={item.packed}
        onChange={() => handlePack(item.id)} />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>{item.quantity}{item.description}</span>
      <button onClick={() => Deleteitem(item.id)}>❌</button>
    </li>
  )
}
function Stat({ items }) {
  if(!items.length) return <p className='stats'><em>let's Add items for your next trip 🚀</em></p>
  const numItems = items.length;
  const numpacked = items.filter(item => item.packed).length;
  const percentge = Math.round(numpacked / numItems * 100);

  return (
    <footer className='stats'>
   <em>  
    {percentge ===100 ? 'you have everything packed ready to go ✈'
     : `you have ${numItems} on list and you already have ${numpacked}(${percentge}%)`}</em> 
    </footer>
  )
}
