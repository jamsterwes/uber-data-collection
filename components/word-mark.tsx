import Image from "next/image"

export function WordMark() {
    return <span className="flex items-center">
        <Image 
            src="/promenade.svg"
            alt="Promenade Logo (dark theme)"
            width="24"
            height="24"
            className="mx-4 scale-0 dark:scale-100" />
        <Image 
            src="/promenade-black.svg"
            alt="Promenade Logo (light theme)"
            width="24"
            height="24"
            className="absolute mx-4 scale-100 dark:scale-0" />
        <span className="font-bold">
            prom.data
        </span>
    </span>
}