import { Button } from "@mui/material";
import backtestimg from '../../assets/img/Myapp_sample.jpeg';
 // import StyledComponent from "../../components/MaterialUI/ButtonMUI";
import { benefit, features, infoDescription, infoTitle, promoDescription, promoTitle } from "../../constants/aboutPageText";
import './about.css';

const About = () => {
  return(
    <>
    <div className="promo__wrapper">
       <section className="promo">
      <h1 className="promo__title">{promoTitle}</h1>
      <div className="promo__description">{promoDescription}</div>
       <div className="promo__go">
        {/* <StyledComponent></StyledComponent> */}
        <Button variant="contained">Start backtesting</Button>
        <Button variant="contained">Login</Button>
       </div>
    </section>
    </div>
   
    <section className="info">
      <div className="info__graph">
        <img src={backtestimg} alt="Backtest graph image" />
      </div>
      <div className="info__text">
        <h2 className="info__title">{infoTitle}</h2>
      <div className="info__description">{infoDescription}</div>
      <Button variant="contained">Learn more</Button>
      </div>
    </section>
    
    <section className="benefit">
      {benefit.map(card => (
        <div className="benefit__card">
          <div className="benefit__title">{card.title}</div>
          <div className="benefit__description">{card.description}</div>
        </div>
      ))
    }
    </section>

    <section className="features">
      {features.map(card => (
         <div className="features__card">
         <img src={card.image} className="features__image" alt='features'/>
         <div className="features__description">{card.description}</div>
       </div>
      ))}
    </section>

    </>

  )
}
export default About;
