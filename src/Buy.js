import React from "react";
import NavBar from './NavBar';
import { useLocation } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// const clientId = process.env.REACT_APP_CLIENT_ID;


function FirstPhoto({modelo}){
  return(
    <img src={require(`./photos/modelos/${modelo}.jpg`)} alt="primera" id="primera" className="img-fluid"/>
  );
}

function SecondPhoto({modelo}){
  return(
    <img src={require(`./photos/ear/${modelo}_bn.jpg`)} alt="segunda" id="segunda" className="img-fluid"/>
  );
}

function ThirdPhoto({modelo}){
  return(
    <img src={require(`./photos/ear/${modelo}_c.jpg`)} alt="tercera" id="tercera" className="img-fluid"/>
  );
}


export default function Buy() {
  const location = useLocation();
  let modelo = location.state.modelo;
  let price = location.state.price;

  const CLIENT_ID = 'test';

  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2"></div>

          <div className="col-md-1">
            <div className="row">
              <FirstPhoto modelo={modelo}/>
            </div>
            <div className="row">
              <SecondPhoto modelo={modelo}/>
            </div>
            <div className="row">
              <ThirdPhoto modelo={modelo}/>
            </div>
          </div>

          <div className="col-md-4">
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">

              <div className="carousel-inner">
                <div className="carousel-item active">
                  <FirstPhoto modelo={modelo}/>
                </div>
                <div className="carousel-item">
                  <SecondPhoto modelo={modelo}/>
                </div>
                <div className="carousel-item">
                  <ThirdPhoto modelo={modelo}/>
                </div>
              </div>

              <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" ></span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" ></span>
              </a>
            </div>
          </div>
          <div className="col-md-3">
            <p>PENDIENTS</p>
            <p>Bueno, bonito y barato.</p>
            <p>Envio a domicilio.</p>

            <div>
              <button className="button-buy">
                <img id="arrow-buy" src="https://svgshare.com/i/pUs.svg" alt="arrow_buy"/>
                <b> Compra compra!</b>
              </button>
            </div>

            <PayPalScriptProvider options={{"client-id": CLIENT_ID, "currency": "EUR" }}>
              <div className="App">
                <header className="App-header">



                  <PayPalButtons
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: price,
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture().then((details) => {
                            const name = details.payer.name.given_name;
                            alert(`Bien hecho ${name}!`);
                        });
                    }}
                />
                </header>
              </div>
            </PayPalScriptProvider>

          </div>

          <div className="col-md-2"></div>
        </div>
      </div>
    </>

  );
};