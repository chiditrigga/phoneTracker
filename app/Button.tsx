"use client"





export default function Button({fetchData}) {
 

  return (
       <>
   
        <button className="font-bold bg-red-700  text-white py-2 mt-2 my-1 rounded w-3/12" onClick={fetchData}>Validate</button>
       </>
  )
   
}
