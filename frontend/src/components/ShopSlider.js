import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.css'
import { getManagers } from "../features/manager/managerThunk";
import { CarouselItem } from './CarouselItem'

export const ShopSlider = () => {

    const dispatch = useDispatch();

    const managers = useSelector(state => state.managers);

    useEffect(() => {
        if (managers.status !== "fulfilled") {
            dispatch(getManagers());
        }
    }, []);

    while (managers.status !== 'fulfilled') {
        return (
            <div className="spinner-border" role="status"></div>
        )
    }
    if (managers.status === 'fulfilled') {
        return (
            <Carousel 
                showArrows={false} 
                showIndicators={false} 
                showThumbs={false} 
                showStatus={false} 
                autoPlay={true}
                infiniteLoop={true}>
                {managers.value.map(manager => (<CarouselItem key={manager.username} manager={manager}/>))}
            </Carousel>
          );
    }
}