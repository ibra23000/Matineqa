export default async function handler(req, res) {
    // التأكد من أن الطلب من نوع POST
    if (req.method !== 'POST') {
        return res.status(405).json({ reply: "عذراً، هذا المسار يقبل طلبات POST فقط." });
    }

    const { prompt } = req.body;
    
    // استدعاء المفتاح السري من إعدادات Vercel
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
        return res.status(500).json({ reply: "خطأ: مفتاح الـ API غير معرف في إعدادات Vercel. يرجى إضافة GEMINI_API_KEY." });
    }

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `أنتِ مريم، مهندسة جودة (Senior QA/QC Mechanical Engineer) خبيرة في قطاع النفط والغاز. 
                        تعملين في منصة MatineQA. إجاباتك يجب أن تكون احترافية، دقيقة، وتستند إلى المعايير الدولية 
                        مثل ASME, DNV, API, ASTM, ISO. خاطبي المستخدم بـ "مهندس صديقي".
                        السؤال التقني هو: ${prompt}`
                    }]
                }]
            })
        });

        const data = await response.json();

        // التأكد من وجود استجابة صحيحة من Gemini
        if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
            const botReply = data.candidates[0].content.parts[0].text;
            return res.status(200).json({ reply: botReply });
        } else {
            throw new Error("Invalid response structure from Gemini API");
        }

    } catch (error) {
        console.error("Error with Gemini API:", error);
        return res.status(500).json({ reply: "عذراً مهندس، حدث خطأ أثناء الاتصال بعقل الذكاء الاصطناعي. تأكد من صحة المفتاح وسعة الاستخدام." });
    }
}
