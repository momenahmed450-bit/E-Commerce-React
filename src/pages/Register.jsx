import { useState } from 'react';
import '../Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        console.log('بيانات التسجيل:', formData);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
    };

    return (
        <div className="register-container">
            <h2>إنشاء حساب جديد</h2>

            {isSuccess && (
                <div className="success-message">
                    تم التسجيل بنجاح 🎉
                </div>
            )}

            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    name="username"
                    placeholder="اسم المستخدم"
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="البريد الإلكتروني"
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="كلمة المرور"
                    onChange={handleChange}
                    required
                />

                <button type="submit">تسجيل الآن</button>
            </form>
        </div>
    );
};

export default Register;
