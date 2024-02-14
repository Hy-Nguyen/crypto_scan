export default function Button({
  text,
}: {
  text: String;
}) {
  return (
    <button className="bg-p3 hover:bg-blue-700 text-white py-2 px- mx-20 rounded">
      {text}
    </button>
  );
}
