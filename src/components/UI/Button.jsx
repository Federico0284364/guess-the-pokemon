export default function Button({className, variant = 'other', children, ...props}){
  const baseStyles = ' rounded-sm px-2 py-1 hover:opacity-90 active:opacity-70 cursor-pointer ";';
  const variants =  {
    primary: ' bg-neutral-100 text-neutral-500',
    secondary: ' bg-neutral-600 text-white',
    close: ' bg-transparent text-neutral-600',
    other: ' text-neutral-600',
    none: ' '
  }

  return(
    <button {...props} className={className + baseStyles + variants[variant]}>
      {children}
    </button>
  )
}