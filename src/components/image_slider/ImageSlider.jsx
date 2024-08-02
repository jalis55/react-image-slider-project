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

    console.log(curSlide);

    if (isLoading) {
        return <div>Loading data ! Please wait</div>;
    }

    if (errorMsg !== null) {
        return <div>Error occured ! {errorMsg}</div>;
    }

    const handlePreviousSlide=()=>{
        setCurSlide(curSlide === 0 ? images.length - 1 : curSlide - 1);
    }

    const handleNextSlide=()=>{
        setCurSlide(curSlide===images.length-1 ? 0: curSlide+1)
    }



    return (
        <div className='container'>
            <BsArrowLeftCircleFill onClick={()=>handlePreviousSlide()} className='arrow arrow-left' />
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
            <span className="circle-indicators">
                {images && images.length
                    ? images.map((_, index) => (
                        <button
                            key={index}
                            className={
                                curSlide === index
                                    ? "current-indicator"
                                    : "current-indicator inactive-indicator"
                            }
                            onClick={() => setCurSlide(index)}
                        ></button>
                    ))
                    : null}
            </span>
            <BsArrowRightCircleFill onClick={()=>handleNextSlide()} className='arrow arrow-right' />
        </div>
    )
}

export default ImageSlider;
