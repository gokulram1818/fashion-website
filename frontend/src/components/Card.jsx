import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import './Card.css'

const Card = ({limit, type }) => {
    const[collection, setCollection] = useState([])
    const[bestSellers, setBestSellers] = useState([])
    function shuffle(arr){
    return arr.sort(()=>Math.random()-0.5)
  }
  const dataToShow=type == "best" ?bestSellers:collection

    useEffect(() => {
        fetch("http://localhost:5000/api/product/list")
          .then((data) => data.json())
          .then(data =>{ setCollection(shuffle(data.products))
        const best = data.products.filter(
            pro =>pro.bestSeller === true)
            setBestSellers(best)}
        )
      }, [])
  return (
   dataToShow.length > 0 && collection.slice(0,limit).map((pro)=>(
    <div className="col-6 col-md-4 col-lg-3 mb-3">
        <Link to={`/product/single/${pro._id}`} key={pro._id} className=" nav-link">
            <div className="card h-100">
                <img src={pro.image[0]} alt="" className=" card-img-top"/>
            </div>
            <div className=" card-body w-100 text-start">
                <h3 className="name">{pro.name}</h3>
                <h3 className="name">₹{pro.price}</h3>
            </div>
        </Link>
    </div>
    ))
  )
}

export default Card