type Props = {
  message?: string;
};

export default function Error({
  message = "Oops! Something went wrong.",
}: Props) {
  return <h1 className="text-5xl">{message}</h1>;
}
