function GameHeader() {
  return (
    <header className="text-center">
      <h1 className="text-4xl font-bold tracking-tight">
        Color Stack
      </h1>

      <p className="mx-auto mt-3 max-w-2xl text-slate-600">
        Drag the top cylinder from any rod and drop it onto another rod.
        Sort the cylinders until every filled rod contains only one color.
      </p>

      <p className="mt-1 text-sm font-medium text-slate-400">
        Only the top cylinder can be moved.
      </p>
    </header>
  )
}

export default GameHeader;