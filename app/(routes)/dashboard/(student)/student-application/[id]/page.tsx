interface IndustryProps {
    params: {
        id: string;
    };
}

const Industry: React.FC<IndustryProps> = async ({ params }) => {
    return (
        <main className="flex min-h-screen flex-col p-4">
            <div>
                <p className="text-xl text-blue-500">
                    This is Application Page {params.id}
                </p>
            </div>
        </main>
    );
};

export default Industry;
