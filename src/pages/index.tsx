import Image from 'next/image';
import { styled } from '../styles'
import { HomeContainer, Product } from '../styles/pages/home';

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.css'
import { stripe } from '../lib/stripe';
import { GetServerSideProps, GetStaticProps } from 'next';
import Stripe from 'stripe';
import Link from 'next/link';

import Head from 'next/head';

const Button = styled('button', {
  backgroundColor: '$rocketseat',
})


interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: number
  }[]
}

export default function Home({ products }: HomeProps) {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });



  return (
    <>

      <Head>
        <title>Home | Ignite Shop</title>
      </Head>


      <HomeContainer ref={sliderRef} className='keen-slider'>

        {products?.map(product => {
          return (
            <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />

                <footer>
                  <strong>{product.name}</strong>
                  <span>{product.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                </footer>
              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps = (async () => {

  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map((item) => {

    const price = item.default_price as Stripe.Price

    return {
      id: item.id,
      name: item.name,
      imageUrl: item.images[0],
      price: price.unit_amount / 100
    }
  })


  return {
    props: {
      products
    },
    revalidate: 3600
  }

}) satisfies GetStaticProps