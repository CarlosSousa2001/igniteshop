import Image from 'next/image';
import {styled} from '../styles'
import { HomeContainer, Product } from '../styles/pages/home';
import camiseta1 from '../assets/plus1.png'
import camiseta2 from '../assets/shirt.png'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.css'

const Button = styled('button', {
  backgroundColor: '$rocketseat',
  
})

export default function Home() {

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    }
  });
  return (
    <HomeContainer ref={sliderRef} className='keen-slider'>
    <Product className='keen-slider__slide'>
      <Image src={camiseta1} width={520} height={480} alt="" />

      <footer>
        <strong>Camiseta X</strong>
        <span>R$ 79,90</span>
      </footer>
    </Product>

    <Product className='keen-slider__slide'>
      <Image src={camiseta2} width={520} height={480} alt="" />

      <footer>
        <strong>Camiseta X</strong>
        <span>R$ 79,90</span>
      </footer>
    </Product>

    <Product className='keen-slider__slide'>
      <Image src={camiseta1} width={520} height={480} alt="" />

      <footer>
        <strong>Camiseta X</strong>
        <span>R$ 79,90</span>
      </footer>
    </Product>

    <Product className='keen-slider__slide'>
      <Image src={camiseta2} width={520} height={480} alt="" />

      <footer>
        <strong>Camiseta X</strong>
        <span>R$ 79,90</span>
      </footer>
    </Product>
  </HomeContainer>
  );
}
