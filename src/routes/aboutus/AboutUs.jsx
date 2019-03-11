import React from 'react';

const AboutUs = () => {
  return (
    <div>
      <div className="containerCol margin10">
        <h1>About Us</h1>
      </div>

      <div className="containerCol">
        <div className="containerCol text-about">
          <h2 className="class-header margin10">Wo are we?</h2>
          <p> We are Pro-Geek. The Action Figure E-commerce. This company was started with a mission statement that said, “We will work toward bringing in the most amount of good-quality, collectible Action-Figures to our clients, in a good web platform, responsible and easy to use.” That mission remains the same today. Over the years, the market has evolved; logistics have changed, the same as the Action-figures sources and our knowledge of web applications, but our services today still hold true to our original mission.</p>
        </div>
      </div>

      <div className="containerCol">
        <div className="containerCol text-about">
          <h2 className="class-header margin10">Deliver & Payment</h2>
          <p>PayPal is accepted, soon we will have other payment methods</p>
        </div>
      </div>

      <div className="containerCol">
        <div className=" containerCol text-about">
          <h2 className="class-header margin10">Devolutions & Exchanges Policy</h2>
          <p className="textAlignC">Due to local logistic complexity and to keep our prices attractive, we do not accept devolutions or exchanges</p>
        </div >
      </div>

      <div className="margin10"></div>

    </div >
  )
}



export default AboutUs;