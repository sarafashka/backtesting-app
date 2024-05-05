import { Button } from "@mui/material";
import { login } from "../../store/authSlice";
import { benefit, features, infoDescription, infoTitle, promoDescription, promoTitle } from "../../content/aboutPageText";
import './about.css';
import { useNavigate } from "react-router-dom";
import AppRoutes from "../../constants/routes";
import { UserLogin } from "../../types/types";
import { useAppDispatch } from "../../hooks/reduxTypedHooks";

const About = () => {

  const userData: UserLogin = {
    username: 'admin',
    password: 'ntvwru94up34u',
  };
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    dispatch(login(userData))
  };

  return(
    <>
    <div className="promo__wrapper">
       <section className="promo">
      <h1 className="promo__title">{promoTitle}</h1>
      <div className="promo__description">{promoDescription}</div>
       <div className="promo__go">
        <Button variant="contained" onClick={() => {
            navigate(AppRoutes.BACKTEST);
          }} >Backtest</Button>
        <Button variant="contained" onClick={handleClick}>Login</Button>
       </div>
    </section>
    </div>
   
    <section className="info">
      <div className="info__graph">
        {/* <img className="info__graph-img" src={backtestimg} alt="Backtest graph image" /> */}
      </div>
      <div className="info__text">
        <h2 className="info__title">{infoTitle}</h2>
      <div className="info__description">{infoDescription}</div>
      <Button variant="contained">Learn more</Button>
      </div>
    </section>
    
    <section className="benefit">
      {benefit.map(card => (
        <div  key={card.id} className="benefit__card">
          <div className="benefit__title">{card.title}</div>
          <div className="benefit__description">{card.description}</div>
        </div>
      ))
    }
    </section>

    <section className="features">
      {features.map(card => (
         <div key={card.id} className="features__card">
          <img src={card.image} className="features__image" alt='features'/>
          <div className="features__description">{card.description}</div>
       </div>
      ))}
    </section>

    </>

  )
}
export default About;
