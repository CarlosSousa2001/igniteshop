import Image from 'next/image';
import { styled } from '../styles'
import { HomeContainer, Product } from '../styles/pages/home';

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.css'
import { stripe } from '../lib/stripe';
import { GetServerSideProps } from 'next';
import Stripe from 'stripe';

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
    <HomeContainer ref={sliderRef} className='keen-slider'>
      {products?.map(product => {
        return (
          <Product key={product.id} className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt="" />

            <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
            </footer>
          </Product>
        )
      })}
    </HomeContainer>
  );
}

export const getServerSideProps = (async () => {

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
    }
  }

}) satisfies GetServerSideProps