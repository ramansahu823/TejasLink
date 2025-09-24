
        // Language Translation Data
        const translations = {
            en: {
                heroTitle: "ThejasLink",
                heroTagline: "A Step Towards Fair & Accessible Healthcare",
                heroDesc: "Your Health, Your Records, Anytime, Anywhere.",
                faqTitle: "Frequently Asked Questions",
                faq1: "What is ThejasLink?",
                faq2: "Is my data secure?",
                faq3: "Can I access my records offline?",
                faq4: "How do I contact support?",
                footerQuestion: "Questions? Call 000-800-919-1694"
            },
            hi: {
                heroTitle: "तेजस लिंक",
                heroTagline: "न्यायपूर्ण और सुलभ स्वास्थ्य सेवा की ओर एक कदम",
                heroDesc: "आपका स्वास्थ्य, आपके रिकॉर्ड, कभी भी, कहीं भी।",
                faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
                faq1: "तेजस लिंक क्या है?",
                faq2: "क्या मेरा डेटा सुरक्षित है?",
                faq3: "क्या मैं अपने रिकॉर्ड ऑफलाइन एक्सेस कर सकता हूँ?",
                faq4: "मैं सपोर्ट से कैसे संपर्क करूँ?",
                footerQuestion: "सवाल हैं? कॉल करें 000-800-919-1694"
            },
            ml: {
                heroTitle: "തേജസ്‌ലിങ്ക്",
                heroTagline: "നീതിയുള്ള, സുലഭമായ ആരോഗ്യപരിചരണത്തിലേക്കുള്ള ഒരു ചുവടു",
                heroDesc: "നിങ്ങളുടെ ആരോഗ്യം, നിങ്ങളുടെ രേഖകൾ, എപ്പോഴും, എവിടെയും.",
                faqTitle: "പതിവായി ചോദിക്കുന്ന ചോദ്യങ്ങൾ",
                faq1: "തേജസ്‌ലിങ്ക് എന്താണ്?",
                faq2: "എന്റെ ഡാറ്റ സുരക്ഷിതമാണോ?",
                faq3: "ഞാൻ എന്റെ റെക്കോർഡുകൾ ഓഫ്ലൈനായി ആക്സസ് ചെയ്യാമോ?",
                faq4: "ഞാൻ സഹായവുമായി എങ്ങനെ ബന്ധപ്പെടാം?",
                footerQuestion: "ചോദ്യങ്ങൾ? വിളിക്കുക 000-800-919-1694"
            }
        };

        const patientData = {
            jaipur: 1200,
            delhi: 5000,
            mumbai: 3000
        };

        // UI Functions
        const showPage = (pageId) => {
            document.querySelectorAll('body > div').forEach(page => page.classList.add('hidden'));
            document.getElementById(pageId).classList.remove('hidden');
            window.scrollTo(0, 0);
        };

        const showContent = (contentId) => {
            document.querySelectorAll('.container').forEach(content => content.classList.add('hidden'));
            document.getElementById(contentId).classList.remove('hidden');
        };

        const goBack = () => {
            if (window.history.length > 1) {
                window.history.back();
                return;
            }
            if (typeof showPage === 'function' && document.getElementById('patient-dashboard')) {
                showPage('patient-dashboard');
            } else {
                window.location.href = 'index.html#patient-dashboard';
            }
        };

        const changeLanguage = (lang) => {
            for (let id in translations[lang]) {
                const element = document.getElementById(id);
                if (element) {
                    element.innerText = translations[lang][id];
                }
            }
            localStorage.setItem('user-lang', lang);
        };

        const generateQRCode = (data) => {
            const qrcodeContainer = document.getElementById('qrcode-box');
            qrcodeContainer.innerHTML = '';
            new QRCode(qrcodeContainer, {
                text: data,
                width: 200,
                height: 200
            });
            document.getElementById('user-unique-id').innerText = data;
        };
        
        const copyUniqueId = () => {
            const uniqueId = document.getElementById('user-unique-id').innerText;
            navigator.clipboard.writeText(uniqueId).then(() => {
                alert('Unique ID copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        };

        const startQRScanner = (userType) => {
            const onScanSuccess = (decodedText, decodedResult) => {
                console.log(`QR Code scanned: ${decodedText}`);
                stopQRScanner();
                if (userType === 'patient') {
                    showPage('patient-dashboard');
                } else if (userType === 'doctor') {
                    showPage('doctor-dashboard');
                }
            };
            const onScanError = (errorMessage) => {
                console.log(`QR Scan error: ${errorMessage}`);
            };
            const config = { fps: 10, qrbox: { width: 250, height: 250 } };
            const qrReaderElement = document.getElementById('qr-reader');
            qrCodeScanner.start({ facingMode: "environment" }, config, onScanSuccess, onScanError);
        };

        const stopQRScanner = () => {
            const qrReaderElement = document.getElementById('qr-reader');
            if (qrCodeScanner.isScanning) {
                qrCodeScanner.stop().then(() => {
                    console.log("QR code scanner stopped.");
                }).catch(err => {
                    console.log("Error stopping QR code scanner:", err);
                });
            }
        };

        const qrCodeScanner = new Html5Qrcode("qr-reader");
        let userRole = '';

        window.onload = function() {
            const savedLang = localStorage.getItem('user-lang') || 'en';
            document.getElementById('languageSwitcher').value = savedLang;
            changeLanguage(savedLang);

            document.getElementById("languageSwitcher").addEventListener("change", (e) => changeLanguage(e.target.value));

            // FAQ functionality
            document.querySelectorAll('.faqbox').forEach(box => {
                box.addEventListener('click', () => {
                    const answer = box.nextElementSibling;
                    const isExpanded = box.getAttribute('aria-expanded') === 'true';
                    box.setAttribute('aria-expanded', !isExpanded);
                    box.classList.toggle('active');
                    answer.style.maxHeight = isExpanded ? '0' : answer.scrollHeight + 'px';
                });
            });

            // Role Selection
            document.getElementById('patient-signup-btn').addEventListener('click', () => {
                userRole = 'patient';
                showPage('patient-reg-page');
            });

            document.getElementById('patient-signin-btn').addEventListener('click', () => {
                userRole = 'patient';
                showPage('login-page');
                startQRScanner(userRole);
            });

            document.getElementById('doctor-signup-btn').addEventListener('click', () => {
                userRole = 'doctor';
                showPage('doctor-reg-page');
            });

            document.getElementById('doctor-signin-btn').addEventListener('click', () => {
                userRole = 'doctor';
                showPage('login-page');
                startQRScanner(userRole);
            });
            
            // Registration Logic - Patient
            document.getElementById('patient-verify-btn').addEventListener('click', () => {
                const aadhar = document.getElementById('patient-aadhar').value;
                if (aadhar.length === 12) {
                    alert(`We will send an OTP to the phone number registered with this Aadhar. Proceed?`);
                    document.getElementById('patient-verify-btn').classList.add('hidden');
                    document.getElementById('patient-otp-section').classList.remove('hidden');
                    document.getElementById('patient-mobile').disabled = false;
                } else {
                    alert('Please enter a valid 12-digit Aadhar number.');
                }
            });
            
            document.getElementById('send-otp-btn').addEventListener('click', () => {
                const mobile = document.getElementById('patient-mobile').value;
                if (mobile.length === 10) {
                    const generatedOTP = Math.floor(100000 + Math.random() * 900000);
                    alert(`OTP sent to ${mobile}: ${generatedOTP}`);
                    document.getElementById('patient-otp').disabled = false;
                    document.getElementById('register-patient-btn').classList.remove('hidden');
                    document.getElementById('register-patient-btn').onclick = () => {
                        if (document.getElementById('patient-otp').value == generatedOTP) {
                            const uniqueId = 'PAT-' + Date.now(); // Unique ID for patient
                            generateQRCode(uniqueId);
                            if (document.getElementById('qrcode-page')) {
                                showPage('qrcode-page');
                            } else {
                                alert('Registration successful! Your ID: ' + uniqueId);
                                showPage('patient-dashboard');
                            }
                        } else {
                            alert('Invalid OTP.');
                        }
                    };
                } else {
                    alert('Please enter a valid 10-digit mobile number.');
                }
            });
            
            // Registration Logic - Doctor
            document.getElementById('doctor-verify-btn').addEventListener('click', () => {
                const aadhar = document.getElementById('doctor-aadhar').value;
                if (aadhar.length === 12) {
                    alert(`We will send an OTP to the phone number registered with this Aadhar. Proceed?`);
                    document.getElementById('doctor-verify-btn').classList.add('hidden');
                    document.getElementById('doctor-otp-section').classList.remove('hidden');
                    document.getElementById('doctor-mobile').disabled = false;
                } else {
                    alert('Please enter a valid 12-digit Aadhar number.');
                }
            });

            document.getElementById('send-otp-btn-doctor').addEventListener('click', () => {
                const mobile = document.getElementById('doctor-mobile').value;
                if (mobile.length === 10) {
                    const generatedOTP = Math.floor(100000 + Math.random() * 900000);
                    alert(`OTP sent to ${mobile}: ${generatedOTP}`);
                    document.getElementById('doctor-otp').disabled = false;
                    document.getElementById('register-doctor-btn').classList.remove('hidden');
                    document.getElementById('register-doctor-btn').onclick = () => {
                        if (document.getElementById('doctor-otp').value == generatedOTP) {
                            const uniqueId = 'DOC-' + Date.now(); // Unique ID for doctor
                            generateQRCode(uniqueId);
                            if (document.getElementById('qrcode-page')) {
                                showPage('qrcode-page');
                            } else {
                                alert('Registration successful! Your ID: ' + uniqueId);
                                showPage('doctor-dashboard');
                            }
                        } else {
                            alert('Invalid OTP.');
                        }
                    };
                } else {
                    alert('Please enter a valid 10-digit mobile number.');
                }
            });

            // Login with Unique ID
            document.getElementById('login-unique-id-btn').addEventListener('click', () => {
                const uniqueId = document.getElementById('login-unique-id').value;
                if (uniqueId.startsWith('PAT-')) {
                    showPage('patient-dashboard');
                } else if (uniqueId.startsWith('DOC-')) {
                    showPage('doctor-dashboard');
                } else {
                    alert('Invalid Unique ID.');
                }
            });

            // Health Alert Preview Logic (Doctor Dashboard)
            document.getElementById('alert-region').addEventListener('change', (e) => {
                const region = e.target.value;
                const patientCount = patientData[region] || 0;
                document.getElementById('patient-count').innerText = patientCount;
                document.getElementById('region-name').innerText = region.charAt(0).toUpperCase() + region.slice(1);
            });
            document.getElementById('publish-alert-btn').addEventListener('click', () => {
                const region = document.getElementById('alert-region').value;
                const message = document.getElementById('alert-message').value;
                alert(`Alert published for ${region} with message: "${message}"`);
                document.getElementById('alert-message').value = '';
                showPage('doctor-dashboard');
            });
        };
   