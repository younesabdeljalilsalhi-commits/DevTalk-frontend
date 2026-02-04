import phoneImage from "../../../assets/Design 1.png";

export default function Main() {
  return (
    <main className="bg-gray-50">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-24 grid md:grid-cols-2 items-center gap-16">
        <div>
          <h1
            className="relative text-5xl md:text-6xl font-semibold text-gray-900 leading-tight
  after:content-[''] after:block after:absolute after:-bottom-4 after:left-0 after:w-54 after:h-3 after:rounded-full after:bg-gradient-to-r after:from-blue-500 after:to-teal-500
  before:content-[''] before:block before:absolute before:-bottom-3.5 before:left-2 before:w-50 before:h-2 before:rounded-full before:bg-gradient-to-r before:from-blue-300 before:to-teal-400">
            Stay connected with Devtalk
          </h1>

          <p className="mt-6 text-xl text-gray-600 leading-relaxed max-w-xl">
            Join the conversation anytime, anywhere with Devtalk, mixing
            development and chatting in one powerful app.
          </p>

          <div className="mt-10">
            <a
              href="#features"
              className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow hover:bg-blue-700 transition">
              Explore Features
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={phoneImage}
            alt="phone"
            className="w-[420px] drop-shadow-2xl"
          />
        </div>
      </section>

      <section id="features" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold text-gray-900 mb-16">
            Features
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Real-time Chat",
                desc: "Connect with developers instantly with our smooth messaging system.",
              },
              {
                title: "Code Sharing",
                desc: "Share code snippets easily and collaborate on projects in real time.",
              },
              {
                title: "Community Forums",
                desc: "Ask questions, give answers, and grow with the Devtalk community.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-16">Contact Us</h2>

          <div className="grid md:grid-cols-3 gap-10 text-lg text-gray-600">
            <div>
              <h3 className="font-semibold text-xl mb-2">Email</h3>
              DevTalk@gmail.com
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Phone</h3>
              +231 055555555
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-2">Address</h3>
              Amizour, ESTIN, J08
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
