import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const PlanetPage = () => {

    const [ planet, setPlanet ] = useState(null)
    const { id } = useParams()

    useEffect(()=>{
        try{
            fetch(`http://localhost:3000/api/planets/${id}`)
            .then((response) => response.json())
            .then((data) => setPlanet(data))


        }catch(error){
            console.error("Failed to fetch planet by ID: ", error)
        }

    },[])

  return (
    <div>
      
    </div>
  )
}

export default PlanetPage
