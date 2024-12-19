import { useState, useEffect } from "react";
import History from "./history";

function HeroSection() {
    const [url, seturl] = useState("");
    const [summarize, setsummarize] = useState("");
    const [history, sethistory] = useState([]);

    // Carregar histórico do localStorage na montagem do componente
    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem("articleHistory")) || [];
        sethistory(storedHistory); // Define o histórico inicial
    }, []);

    // Atualizar o localStorage sempre que o estado `history` mudar
    useEffect(() => {
        if(history.length > 0) {
            localStorage.setItem("articleHistory", JSON.stringify(history));
        }
    }, [history]);

    async function obterApiResum() {
        if (!url.trim()) {
            setsummarize("Por favor, insira um link válido");
            return;
        }

        const existingEntry = history.find((entry) => entry.url === url);
        if (existingEntry) {
            setsummarize(existingEntry.summary);
            return;
        }

        const Apiurl = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(url)}&lang=en&engine=2`;
        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-key": "8f3cd822aemsh997c81a6c265832p142559jsn4453151f4581",
                "x-rapidapi-host": "article-extractor-and-summarizer.p.rapidapi.com",
            },
        };

        try {
            const response = await fetch(Apiurl, options);
            const result = await response.json();
            if (result.summary) {
                setsummarize(result.summary);

                const newEntry = { url, summary: result.summary };
                sethistory((prevHistory) => [...prevHistory, newEntry]);
            } else {
                setsummarize("Não foi possível obter o resumo");
            }
        } catch (error) {
            setsummarize("Erro ao buscar o resumo");
            console.error(error);
        }
    }

    function handleSelected(url) {
        const selectedEntry = history.find((entry) => entry.url === url);
        if (selectedEntry) {
            setsummarize(selectedEntry.summary);
        }
    }

    return (
        <div className="flex flex-col items-center mt-6 lg:mt-20">
            <h1 className="font-bold text-6xl lg:text-7xl text-center tracking-wide">Faça resumos de Artigos com</h1>
            <h1 className="font-bold text-6xl lg:text-7xl text-center tracking-wide bg-gradient-to-r from-orange-500 to-red-600 text-transparent bg-clip-text">
                API de OpenAI
            </h1>
            <div className="flex flex-col items-center mt-6">
                <p className="font-semibold">Esta é uma ferramenta para trabalhar com artigos e transformar textos longos em resumos claros e concisos.</p>
            </div>
            <div className="mt-8 flex items-center justify-center w-full max-w-2xl">
                <input
                    type="text"
                    onChange={(e) => seturl(e.target.value)}
                    placeholder="Colar o link do artigo"
                    className="w-full px-4 py-3 text-gray-700 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                    onClick={obterApiResum}
                    className="px-6 py-3 text-white bg-orange-500 rounded-r-lg hover:bg-orange-600"
                >
                    Send
                </button>
            </div>

            <History history={history} onSelect={handleSelected} />

            {summarize && (
                <div className="mt-8 p-4 bg-gray-100 border rounded-lg max-w-2xl text-gray-800">
                    <h2 className="text-2xl font-bold mb-4">Resumo:</h2>
                    <p className="leading-relaxed">{summarize}</p>
                </div>
            )}
        </div>
    );
}
export default HeroSection;
