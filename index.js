const express = require ('express');
const app = express();
const items = require('./Items');

app.use(express.urlencoded({extended:true}));
app.use (express.json())

app.get ('/api/items', (req,res)=>{
    res.json(items);
})

app.post ('/api/items', (req,res)=>{
    const newItem = {
        id:req.body.id,
        name:req.body.name,
        price:req.body.price
    }
    items.push(newItem);
    res.json(items)
})

app.delete('/api/items/:id', (req, res)=>{
    let { id } = req.params;
    let itemToDelete = items.find(item=> item.id === id);
        
    if (itemToDelete){
        res.json({
            message: "Item Deleted",
            items:items.filter(item =>item.id !== id)
        })
    }
    else {
        res.status (404);
        res.json({message:"This item does not exist"})
    }
})
/* I have tried writing it this way, but it didmt work: 
app.put ('/api/items/:name/:id/:price',(req,res)=> */
app.put ('/api/items/:name/:id',(req,res)=>{
    let { name } = req.params;
    let { id } = req.params;
    //let { price } = req.params;
    let itemToUpdate = items.find((item=>item.name === name),(item=>item.id === id) /*,(item=>item.price === price)*/)
  
    
    if (itemToUpdate){
        const updateItem = req.body;

        items.forEach(item=>{
            if(item.name === req.params.name, item.id === req.params.id /*item.price === req.params.price*/){
                item.name = updateItem ? updateItem.name : item.name;
                item.id = updateItem ? updateItem.id : item.id;
                //item.price = updateItem ? updateItem.price : item.price;
               
                res.json({message:"Item updated", item})
            }  
        });
    }
    else {
        res.status (404);
        res.json({message: `Item ${req.params.name} doesn't exist`})
    }
})



app.listen (4000, ()=>{
    console.log(`IT'S WORKING!!!!`)
})