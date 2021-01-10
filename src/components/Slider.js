import { Carousel } from 'react-bootstrap'

const Slider = (props) => {

    let slides = props.slides
    return (
        <div>   
            <Carousel controls={false}>
                {
                    slides.map((item,i) => {
                        return (<Carousel.Item key={i}>
                            <div className="carousel-img">
                                <img
                                className="d-block w-100"
                                src={item.src}
                                alt=""
                                />
                            </div>
                            <Carousel.Caption>
                            <h2>{item.caption}</h2>
                            </Carousel.Caption>
                        </Carousel.Item>);
                    })
                }
            </Carousel>
        </div>
    );
}

export default Slider;