export default function SeekCertification({ certifications }){
    return(
        <div className="flex flex-col w-full max-w-4xl p-4 border-b-2 pb-8">
            <h2 className="text-2xl font-semibold mb-4">자격증</h2>
            <div className="border p-4 rounded-lg w-full max-w-4xl">
                {certifications.map((cert) => (
                    <div key={cert.id} className="mb-2">
                        <p className="font-bold">{cert.title}</p>
                        <p>취득일: {cert.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}