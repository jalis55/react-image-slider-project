import { React, useEffect, useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./ImageSlider.css";

const ImageSlider = ({ limit }) => {
    const [images, setImages] = useState(0);
    const [curSlide, setCurSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const url = `https://picsum.photos/v2/list?page=1&limit=10`;


    const fetchUrl = async (getUrl) => {
        try {
            setIsLoading(true);

            const response = await fetch(getUrl)
            const data = await response.json();

            if (data) {
                setImages(data);
                setIsLoading(false)
            }
        }
        catch (e) {
            setErrorMsg(e.message)
            setIsLoading(false)
        }
    }



    useEffect(() => {
        if (url !== "") {
            fetchUrl(url);
        }
    }, [url]);

    console.log(images)

    if (isLoading) {
        return <div>Loading data ! Please wait</div>;
    }

    if (errorMsg !== null) {
        return <div>Error occured ! {errorMsg}</div>;
    }



    return (
        <div className='container'>
            <BsArrowLeftCircleFill className='arrow arrow-left' />
            {images && images.length
                ? images.map((imageItem, index) => (
                    <img
                        key={imageItem.id}
                        alt={imageItem.download_url}
                        src={imageItem.download_url}
                        className={
                            curSlide === index
                                ? "current-image"
                                : "current-image hide-current-image"
                        }
                    />
                ))
                : null}
            <BsArrowRightCircleFill className='arrow arrow-right' />
        </div>
    )
}

export default ImageSlider;
