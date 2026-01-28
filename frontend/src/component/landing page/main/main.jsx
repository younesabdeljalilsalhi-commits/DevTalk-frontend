import react from "react";
import phoneImage from "../../../assets/Design 1.png";
import Vector from "../../../assets/Vector.png";
import Auth from "../../login and sign up/auth/authentification";
export default function Main() {
  return (
    <main className="w-full h-screen flex items-center justify-center px-20 bg-cream-50">
      <section className="w-full flex items-center justify-between">
        <div className="mb-30 ml-44 max-w-2xl flex flex-col ">
          <h1 className="text-7xl text-gray-900 mb-5 leading-tight font-light tracking-wider">
            Stay connected with Devtalk
          </h1>
          <img src={Vector} alt="nothing" className="w-70 h-8 ml-40 -mt-5" />
          <br />
          <p className="text-4xl text-gray-600 leading-relaxed tracking-wider">
            join the conversation anytime anywhere with Devtalks which mix
            development and chatting in one app.
          </p>
        </div>

        <div className="w-1/3 h-auto rounded-full flex items-center justify-center m-10">
          <img src={phoneImage} alt="phone image" className="w-full h-auto" />
        </div>
      </section>
    </main>
  );
}
