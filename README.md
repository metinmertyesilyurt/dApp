# Ethereum React Ethers.js Uygulaması

Bu proje, Ethereum blockchainine etkileşimli bir React uygulamasıdır. Kullanıcılar, Ether gönderebilir, hesap bilgilerini görüntüleyebilir ve NFT oluşturabilirler.

## Nasıl Çalışır?

1. Proje değişkenlerini yükleyin ve içe aktarın.
2. Ethereum ağına bağlanmak için bir `provider` oluşturun ve bir `signer` oluşturun. Bu, kullanıcıların işlemlerini imzalamalarını sağlar.
3. React state kullanarak gerekli değişkenleri tanımlayın ve Ethereum işlemleri için gerekli fonksiyonları oluşturun.
4. `useEffect` kullanarak, hesap detaylarınızı, blok numarasını ve gaz fiyatını güncelleyin.
5. Kullanıcıların Ether göndermesini sağlayan bir fonksiyon oluşturun. Bu fonksiyon, adres ve miktar bilgilerini kullanarak işlemi gerçekleştirir.
6. Kullanıcıların NFT oluşturmasını sağlayan bir fonksiyon oluşturun. Bu fonksiyon, akıllı sözleşme ile etkileşime geçer ve NFT oluşturur.
7. React bileşenlerini düzenleyin ve gerekli alanları ve butonları ekleyin.

## Kurulum

1. Projeyi kopyalayın: git clone
2. Proje dizinine gidin: `cd project-directory`
3. Bağımlılıkları yükleyin: `npm install`
4. `.env` dosyası oluşturun ve gerekli ortam değişkenlerini ekleyin:

```
REACT_APP_ALCHEMY_API=<alchemy-api-key>
REACT_APP_PRIVATE_KEY=<private-key>
```
Ortam değişkenleri için package.json dosyasını editlemeyi unutmayınız. 

 "scripts": {
    "start": "react-dotenv && react-scripts start",
    "build": "react-dotenv && react-scripts build",
    "serve": "react-dotenv && serve build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },


  "react-dotenv": {
    "whitelist": [
      "PRIVATE_KEY",
      "ALCHEMY_API"
    ]
  }

5. Uygulamayı başlatın: `npm start`



---------------------------------------------
![image](https://github.com/metinmertyesilyurt/dApp-with-ethers-and-react/assets/46091887/79051d28-87a7-4d6d-9add-dc684c3f2be4)
---------------------------------------------
![image](https://github.com/metinmertyesilyurt/dApp-with-ethers-and-react/assets/46091887/80d78c46-d1d5-4ee6-87f0-c1d5d11e6c63)
---------------------------------------------
![image](https://github.com/metinmertyesilyurt/dApp-with-ethers-and-react/assets/46091887/01dc6b6a-9662-44f8-91f9-98f27c57106d)
---------------------------------------------
![image](https://github.com/metinmertyesilyurt/dApp-with-ethers-and-react/assets/46091887/cebf7a53-58bd-46d7-a02d-df629badda40)
---------------------------------------------
![image](https://github.com/metinmertyesilyurt/dApp-with-ethers-and-react/assets/46091887/c04a0858-070e-42cc-b5c6-887342eb26d7)
---------------------------------------------
