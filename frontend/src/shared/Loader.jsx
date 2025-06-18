import { BounceLoader } from 'react-spinners'

export const LoaderComponent = ({ height = 80, width = 80 }) => {
    return <BounceLoader height={height} width={width} color="#26d5ab" />
}

const Loader = () => {
    return (
        <div className='h-screen absolute flex justify-center items-center backdrop-brightness-50 z-50 w-screen'>
            <LoaderComponent />
        </div>
    )
}

export default Loader