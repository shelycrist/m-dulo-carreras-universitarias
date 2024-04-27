export function Video({ url }) {
  return (
    <div className="w-full">
      <iframe
        className="w-full"
        src={url}
        height="378"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
