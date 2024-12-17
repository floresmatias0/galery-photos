'use client'
import { useCallback, useEffect, useState } from "react";
import Card from "./components/card";
import Slider from "react-slick";
import { FaXmark } from "react-icons/fa6";
import Image from 'next/image';
import { getPhotosData } from "@/utils/photos";

// const photos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const Home = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showSlider, setShowSlider] = useState(false)
  const [photos, setPhotos] = useState([])
  const [portada, setPortada] = useState('')

  const settings = {
    className: "center",
    dots: true,
    speed: 500,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: i => (
      <Image src={`/${photos[i]}`} alt={`random=${i+1}`} width={250} height={250} className="object-cover object-center w-full h-full rounded-lg"/>
    )
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setShowSlider(true);
  };

  const fetchData = useCallback(async () => {
    try {
        const data = await getPhotosData()
        const response = await data.json()

        setPhotos(response?.data?.filter(ph => ph !== 'poster-friends.webp'))
        setPortada(response?.data?.find(ph => ph === 'poster-friends.webp'))
    } catch (err) {
        console.log(err);
        throw new Error(err?.message)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <main className="relative mx-auto min-h-screen max-w-[1960px] p-4 bg-black">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <div className="row-span-2 bg-white rounded-xl">
          <Card 
            title="Hola mundo!"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            image={portada && `/${portada}`}
          />
        </div>
        {photos?.length > 0 && photos?.map((x, i) => <div key={i} className="rounded-xl min-h-64 max-h-64 overflow-hidden" onClick={() =>  handleImageClick(i)}><Card image={`/${x}`} hover={true}/></div>)}
      </div>
      {showSlider && (
        <div className="fixed top-0 left-0 z-20 w-full h-screen">
          <FaXmark onClick={() => setShowSlider(!showSlider)} className="absolute top-2 right-2 z-50 w-[28px] h-[28px] fill-black opacity-75 hover:opacity-100 cursor-pointer p-1 bg-white rounded-full"/>
          <div className="slider-container">
            <Slider {...settings} initialSlide={selectedImageIndex}>
              {photos?.length > 0 && photos?.map((x, i) => (
                <div key={i} className="w-full h-screen flex justify-center items-center backdrop-opacity-5 bg-black/75">
                  <div className="flex w-2/4 h-full overflow-hidden mx-auto">
                    <Image 
                      src={`/${x}`}
                      width={200}
                      height={300}
                      alt={`random=${i}`}
                      className='w-full h-full object-cover object-center'
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home
