
function History({ history, onSelect }) {
    return (
        <div className="mt-8 p-4 bg-gray-50 border rounded-lg max-w-2xl text-gray-800 w-full">
            {history.length === 0 ? (
                <p className="text-gray-600">Nenhum link no histórico ainda.</p>
            ) : (
                <div className="flex flex-col space-y-4">
                    {history.map((entry, index) => (
                        <div
                            key={index}
                            className="flex w-full px-4 py-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white cursor-pointer"
                            onClick={() => onSelect(entry.url)}
                        >
                            <span className="text-blue-600 hover:underline break-words">
                                {entry.url}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default History;