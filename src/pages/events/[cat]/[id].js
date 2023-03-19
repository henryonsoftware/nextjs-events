import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import Layout from '/components/layout'
import Image from 'next/image'

export default function EventDetailPage({ cat, id, event }) {
  const [message, setMessage] = useState('')
  const inputEmail = useRef()
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const eventId = router?.query.id
    const emailValue = inputEmail.current.value
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailValue.match(validRegex)) {
      setMessage('Please enter the correct email')
      return
    }

    try {
      const res = await fetch('/api/email-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: inputEmail.current.value,
          eventId: eventId
        })
      })
      .then(res => res.json())
      .then(res => {
        setMessage(res.message)
      })
    } catch (e) {
      setMessage('Something wrong! Try again later')
      console.log(e)
    }
  }

  return (
    <Layout>
      <div className="md:w-6/12 mx-auto">
        <Image src={event.image} width={700} height={300} />
        <h3 className='text-3xl my-4 font-bold'>{event.title}</h3>
        <p className='mb-2'>{event.description}</p>
        <form action="" method="POST" onSubmit={handleSubmit}>
          <label htmlFor="email">Register for this event: </label>
          <br />
          <input type="email" name="email" className="p-1 rounded mr-2 my-1 border border-1-white" ref={inputEmail} />
          <button className="px-2 py-1 rounded border border-1-white" type="submit">Submit</button>
          {message.length > 0 && <p className="text-sm">{message}</p>}
        </form>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const { allEvents } = await import('/data/data.json')
  const allPaths = allEvents.map(e => {
    return {
      params: {
        cat: e.city,
        id: e.id
      }
    }
  })

  return {
    paths: allPaths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const cat = context?.params.cat
  const id = context?.params.id

  const { allEvents } = await import('/data/data.json')
  const event = allEvents.find(e => e.id === id)
  
  return {
    props: {
      cat,
      id,
      event
    }
  }
}
