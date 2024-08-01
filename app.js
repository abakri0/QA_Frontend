const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // إضافة مكتبة CORS

const app = express();
const port = 3000;

app.use(cors()); // تفعيل CORS
app.use(bodyParser.json());

// Mock database for checking email
const existingEmails = new Set(); // تستخدم لتخزين البريد الإلكتروني الموجود مسبقاً

app.post('/api/check-email', (req, res) => {
    const { email } = req.body;
    // تحقق إذا كان البريد الإلكتروني موجوداً مسبقاً
    if (existingEmails.has(email)) {
        res.json({ available: false });
    } else {
        res.json({ available: true });
    }
});

app.post('/api/register', (req, res) => {
    const { firstName, lastName, email, password, dob } = req.body;

    // تحقق من صحة البيانات (يمكنك تعديل هذا بناءً على متطلباتك)
    if (firstName && lastName && email && password && dob) {
        // إضافة البريد الإلكتروني إلى قاعدة البيانات المؤقتة
        existingEmails.add(email);

        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'يرجى ملء جميع الحقول' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
