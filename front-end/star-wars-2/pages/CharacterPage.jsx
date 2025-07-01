import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfoCard from '../src/components/InfoCard'

const character = () => {

    const [ character, setCharacter ] = useState(null)
    const [ characterFilms, setCharacterFilms ] = useState([])
    const { id } = useParams()

    useEffect(()=>{
        try{

          const fetchData = async () => {

            const characterRes = await fetch(`http://localhost:3000/api/characters/${id}`)
            const characterData = await characterRes.json()
            setCharacter(characterData)

            const characterFilmsRes = await fetch(`http://localhost:3000/api/characters/${id}/films`)
            const charterFilmsData = await characterFilmsRes.json()
            setCharacterFilms(charterFilmsData)

          }
            
          fetchData()


        }catch(error){
            console.error("Failed to fetch characters data ", error)
        }

    },[])


  return (
    <div>




      {<InfoCard/>}
      
    </div>
  )
}

export default character
