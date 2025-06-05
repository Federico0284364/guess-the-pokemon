import Button from "./Button";

export default function BackButton({className, onClick}){
  return (
    <Button onClick={onClick} className={className + " active:opacity-70 hover:bg-neutral-300 hover:text-neutral-700 font-extrabold text-xl text-center py-1 w-9 aspect-square items-center rounded-sm bg-neutral-600 border-neutral-300"} variant="secondary">{'x'}</Button>
  )
}