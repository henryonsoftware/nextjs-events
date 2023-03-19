import Link from 'next/link'
import Image from 'next/image'
import Layout from '/components/layout'

export default function EventCategoriesPage({ categoryId, events }) {
  return (
    <Layout>
      <h2 className='text-2xl my-4 font-bold'>#{ categoryId }</h2>
      <div className='grid grid-cols-4 gap-4'>
        {events.map(function (event) {
          return (
            <div key={event.id}>
              <Link href={`/events/${categoryId}/${event.id}`}>
                <Image src={event.image} alt={event.title} width={300} height={170} />
                <h2 className='text-lg my-2'>{event.title}</h2>
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const { eventCategories } = await import('/data/data.json')
  const allPaths = eventCategories.map(c => {
    return {
      params: {
        cat: c.id.toString()
      }
    }
  })

  return {
    paths: allPaths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const categoryId = context?.params.cat
  const { allEvents } = await import('/data/data.json')
  const events = allEvents.filter(event => event.city === categoryId)

  return {
    props: {
      categoryId,
      events
    }
  }
}
