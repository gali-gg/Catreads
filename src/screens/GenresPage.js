import React from 'react'
import { useParams } from 'react-router-dom'

export default function GenresPage() {

    const params = useParams();

  return (
    <>
    {params.gname &&
        <h1>{params.gname} page</h1>
    }
    {!params.gname &&
        <h1>All genres page</h1>
    }
    </>
  )
}
