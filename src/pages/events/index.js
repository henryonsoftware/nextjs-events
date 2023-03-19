import Link from 'next/link'
import Image from 'next/image'
import Layout from '/components/layout'

export default function CategoryPage({ categories }) {
  return (
    <Layout>
      <h2 className='text-2xl my-4 font-bold'>Events</h2>
      <div className='grid grid-cols-3 gap-4 content-center '>
        {categories.map(c => {
          return (
            <div key={c.id}>
              <Link href={`/events/${c.id}`}>
                <Image src={c.image} alt={c.title} width={300} height={170} />
                <h2 className='text-xl my-2'>{c.title}</h2>      
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const data = await import('/data/data.json')

  return {
    props: {
      categories: data.eventCategories,
    }
  }
}