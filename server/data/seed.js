const mongoose = require("mongoose");
const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { Delivery } = require("../models/Delivery");

const seed = () => {
  mongoose.connection.once("open", async () => {
    const userCount = await User.countDocuments({});
    if (userCount === 0) {
      const userArr = [
        {
          fullName: "Mahmut Tuncer",
          email: "mahmut@test.com",
          password: "123",
          avatarPath: "/mahmuttuncer.jpg",
        },
        {
          fullName: "Bülent Ersoy",
          email: "bulent@test.com",
          password: "123",
          avatarPath: "/bulentersoy.png",
        },
        {
          fullName: "Zeki Müren",
          email: "zeki@test.com",
          password: "123",
          avatarPath: "/zekimuren.jpg",
        },
      ];
      const inserted = await User.insertMany(userArr);
      if (inserted) {
        console.log("User seed inserted successfuly");
      } else {
        console.log("Failed to insert users");
      }
    }

    const productCount = await Product.countDocuments({});
    if (productCount === 0) {
      const productArr = [
        {
          name: "HOMM LIFE NEFES TAZELEYİCİ AĞIZ SPREYİ 25 ML",
          stock: "99",
          description: "HOMM LIFE NEFES TAZELEYİCİ AĞIZ SPREYİ 25 ML",
          price: 149.5,
          imagePath: "/1.jpg",
        },
        {
          name: "HOMM LIFE SİYAH KARBON DİŞ MACUNU 75 ML",
          stock: "99",
          description: "Aktif İçerik; Aktif Karbon, Nane Yağı, Mentol",
          price: 214.5,
          imagePath: "/2.jpg",
        },
        {
          name: "HOMM LIFE BB KREM LIGHT 50+ SPF 40 ml",
          stock: "99",
          description:
            "HOMM LIFE BB KREM LIGHT 50+ SPF 40 ml Aktif içerik; Vitamin C,Gül Özü",
          price: 305.5,
          imagePath: "/3.jpg",
        },
        {
          name: "HOMM LIFE ÇAY AĞACI YAĞLI YÜZ YIKAMA JELİ 250 ML",
          stock: "99",
          description:
            "Aktif Bileşenler: Aynısafa Özü, Çay Ağacı Yağı, Kantaron Özü, Papatya Özü Kullanım Şekli: Nemli yüzünüze bir miktar jeli masaj yaparak uygulayınız ve bol su ile durulayınız. Makyajınızı temizlemek için de kullanabilirsiniz.",
          price: 266.5,
          imagePath: "/4.jpg",
        },
        {
          name: "HOMM LIFE KAYISILI PEELING KREM 100 ML",
          stock: "99",
          description:
            "Aktif İçerik: Kayısı Çekirdeği Tozu, Vitamin B5, Allantoin, Vitamin E Kullanımı: Cilt temizlendikten sonra yüz, boyun ve dekoltede kalın bir tabaka halinde uygulanmalı, gözler ve ağız hassasiyetle korunmalıdır.Uygulandıktan 10-15 dakika sonra ılık su ile dairesel hareketlerle yıkanıp cilt temizlenebilir.",
          price: 197.6,
          imagePath: "/5.jpg",
        },
      ];
      const inserted = await Product.insertMany(productArr);
      if (inserted) {
        console.log("Product seed inserted successfuly");
      } else {
        console.log("Failed to insert users");
      }
    }

    const deliveryCount = await Delivery.countDocuments({});
    if (deliveryCount === 0) {
      const deliveryArr = [
        {
          name: "PTT Kargo",
          logoPath: "/ptt.png",
          price: 69,
        },
        {
          name: "MNG Kargo",
          logoPath: "/mng.webp",
          price: 69,
        },
        {
          name: "Hepsijet",
          logoPath: "/hepsijet.png",
          price: 69,
        },
      ];
      const inserted = await Delivery.insertMany(deliveryArr);
      if (inserted) {
        console.log("Delivery seed inserted successfuly");
      } else {
        console.log("Failed to insert deliveries");
      }
    }
  });
};

module.exports = seed;
