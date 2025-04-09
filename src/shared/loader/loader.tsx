type LoaderProps = {
  message?: string
}

export const Loader = ({ message = 'Загрузка...' }: LoaderProps) => {
  return (
    <div className="fixed w-screen h-screen top-0 left-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-transparent border-t-purple-600 border-b-purple-600 rounded-full animate-spin" />
        <p className="text-white text-lg font-semibold drop-shadow">{message}</p>
      </div>
    </div>
  )
}
