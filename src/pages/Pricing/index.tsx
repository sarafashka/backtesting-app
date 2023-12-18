import { Button } from '@mui/material';
import { plan, planSoon } from '../../content/pricingPageText';
import './pricing.css';

const Pricing: React.FC = () => {
  return (
    <>  
      <h2 className="pricing__title">You can choose your plan</h2>
      <div className="pricing__wrapper">

        <section className='plan'>
          <div className='plan__wrapper'>
            <div className='plan__name'>{plan.name}</div> 
            <div className='plan__icon'>
              <svg className="plan__icon-img">
                <use href={plan.icon} />
              </svg>
              </div>
            <div className='plan__title'>{plan.title}</div>  
            <div className='plan__description'>{plan.description}</div>
            <div className='plan__price'>
              <div className='plan__cost'>{plan.cost}</div>
              <div className='plan__period'>{plan.period}</div>   
            </div>
            <div className='plan__get'>
            <Button variant="contained" fullWidth  >Get started</Button></div> 
          </div>
        </section>

        <div className='plan__soon'>
           <div className='plan__soon_description'>{planSoon.description}</div>
           <div className='plan__soon-icon'>
              <svg className="plan__soon-img">
                <use href={planSoon.icon} />
                </svg>
            </div>
        </div>
           

        {/* <section className='plan'>
          <div className='plan__wrapper'>
            <div className='plan__name'>Professional</div> 
            <div className='plan__soon_img'></div>
            <div className='plan__soon_description'>More options and plans are coming soon</div>
          </div>
        </section> */}
        
      </div>
    </>
  
  );
};

export default Pricing;