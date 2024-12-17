import Image from 'next/image'

const Card = ({image, title, description, hover}) => {
    return (
        <div className="relative w-full h-full p-4 overflow-hidden rounded-xl">
            {image && <Image src={image} width={200} height={300} className={`absolute top-0 left-0 min-w-full min-h-full object-center object-cover cursor-pointer rounded-xl ${hover && 'hover:brightness-90'}`} alt={title ?? 'default'}/>}
            {title && <h1 className="text-center font-bold capitalize">{title}</h1>}
            {description && <p className="text-center">{description}</p>}
        </div>
    )
}

export default Card