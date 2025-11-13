export default function Error({ message }) {
  return (
    <h1 className="text-5xl">{message || "Oops! something went wrong"}</h1>
  );
}
