import Link from 'next/link'
import Image from 'next/image'
import Layout from '/components/layout'

export default function Home({ categories }) {
  return (
    <Layout>
      <h2 className='text-2xl my-4 font-bold'>Home</h2>
      <div className="grid grid-cols-3 gap-4 content-center ">
        {categories.map((c) => {
          return (
            <div key={c.id}>
              <Link href={`/events/${c.id}`}>
                <Image src={c.image} width={300} height={170} className="rounded" alt={c.title} />
              </Link>
              <h2 className="text-xl font-bold my-4">{c.title}</h2>
              <p className="text-base mb-2">{c.description}</p>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const data = await import('/data/data.json');

  return {
    props: {
      categories: data.eventCategories
    }
  }
}
