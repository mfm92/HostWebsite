// components/TitleBanner.js

export default function TitleBanner() {
  return (
    <section className="flex flex-col items-center space-y-5">
      <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-orange-700/80 to-orange-300/80 text-white p-8 rounded-2xl shadow-2xl tracking-wide">
        NSC 242 in Begonia
      </h1>
      <div className="max-w-xl w-full mx-auto text-center text-lg bg-gray-900/95 p-6 rounded-xl shadow-lg border-t-4 border-b-4 border-orange-400 animate-pulse transition-shadow hover:shadow-2xl">
        <p className="text-orange-400">
          Send your entry until <b className="text-white">July 27 (end of day, CEST)</b>* to participate.
          <br />
          <span className="text-white text-sm">
            *Deadline could be pushed back if the forum is lagging again.
          </span>
          <br />
          <br />
          Send your entry either to <a href="https://www.escunited.com"
              className="text-white underline">@pjelacki</a> on ESCunited.com or to @mfmo92 on Discord.
          <br />
          <div className="text-sm text-white">Consider sending your entry to the NSC Host Helper on escunited.com as well.</div>
        </p>  
      </div>
    </section>
  );
}
