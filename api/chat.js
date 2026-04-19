// هذا الملف يعمل كخادم وسيط مخفي على Vercel
export default async function handler(req, res) {
    const { prompt } = req.body;
    const API_KEY = process.env.GEMINI_API_KEY; // هنا يتم استدعاء المفتاح المشفر من إعدادات Vercel

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ 
                    parts: [{ text: "You are Meriem, an expert Senior QA/QC Engineer. Answer this technical query: " + prompt }] 
                }]
            })
        });

        const data = await response.json();
        const reply = data.candidates[0].content.parts[0].text;
        res.status(200).json({ reply });
    } catch (error) {
        res.status(500).json({ reply: "خطأ في الاتصال بالذكاء الاصطناعي." });
    }
}
