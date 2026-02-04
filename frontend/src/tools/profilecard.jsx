import Pfp from "./pfp";
export default function ProfileCard({
  Src,
  Alt,
  Profilename,
  Lastmessage,
  Number,
}) {
  return (
    <div>
      <div className="flex items-center gap-4 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
        <Pfp Src={Src} Alt={Alt} Size="medium" Active={null} />
        <div>
          <h2 className="font-semibold">{Profilename}</h2>
          <p className="text-sm text-gray-500">{Lastmessage}</p>
        </div>
        <h1 className="ml-auto text-white bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-sm">
          {Number}
        </h1>
      </div>
    </div>
  );
}
