import React from 'react'
import { ImageContainer, ProductContainer, ProductDetailsComponent } from '../../styles/pages/product'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import { stripe } from '../../lib/stripe'
import Stripe from 'stripe'

interface ProductsProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number,
    description: string
  }
}

export default function ProductDetails({ product }: ProductsProps) {

  const { query } = useRouter()


  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>

      <ProductDetailsComponent>
        <h1>{product.name}</h1>
        <span>{product.price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</span>

        <p>{product.description}</p>

        <button>
          Comprar agora
        </button>
      </ProductDetailsComponent>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths:[
      {params: {id: 'prod_PgjWqTjX2qRIcG'}}
    ],
    fallback: 'blocking'
  }
}


export const getStaticProps: GetStaticProps<any, {id:string}> = async ({params}) => {

  const productId = params.id;

  const item = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = item.default_price as Stripe.Price


  return {
    props:{
      product:{
        id: item.id,
        name: item.name,
        imageUrl: item.images[0],
        price: price.unit_amount / 100,
        description: item.description
      }
    },
  }
}