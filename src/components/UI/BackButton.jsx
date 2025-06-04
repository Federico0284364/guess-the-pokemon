import Button from "./Button";

export default function BackButton({className, onClick}){
  return (
    <Button onClick={onClick} className={className + " active:opacity-70 hover:bg-neutral-300 hover:text-neutral-700 font-extrabold text-xl text-center pb-1 mt-4 w-10 aspect-square items-center rounded-xl bg-neutral-700 border-4 border-neutral-300"} variant="none">{'x'}</Button>
  )
}