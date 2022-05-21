import Image from 'next/image'

export default function Loader() {
    return (
        <div className="h-screen flex justify-center items-center relative top-0">
            <div className=" flex flex-col justify-center items-center absolute">
                <Image
                    src="/colony.svg"
                    width="200px"
                    height="200px"
                    alt="Colony"
                    className="m-auto inline-block"
                />
                <div>Loading ...</div>
            </div>
        </div>
    )
}
