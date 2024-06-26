const prisma = require("./src/server/client");
const bcrypt = require("bcrypt");

async function main() {
  try {
    // Clear existing orderHistory and related records
    await prisma.orderHistory.deleteMany({});
    await prisma.cart.deleteMany({});

    // Clear existing users (optional, if needed)
    await prisma.users.deleteMany({});

    // Clear existing cars
    await prisma.cars.deleteMany({});
    
    // Hash the admin password
    const hashedPassword = await bcrypt.hash("securepass", 10);

    const users = await prisma.users.createMany({
      data: [
        {
          fullName: "admin admin",
          username: "admin",
          email: "emily@example.com",
          password: hashedPassword,
          address: "199 Locktight Court",
          phone: "9041181788",
          Admin: true,
        },
      ],
    });

    console.log("Users seeded successfully:", users);

    const cars = await prisma.cars.createMany({
      data: [
        {
          make: "Honda",
          model: "Accord",
          newUsed: true,
          color: "White",
          year: 2020,
          bodyType: "Sedan",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F65e81151f52e248c552b-fe74cd567ea2f1228f846834bd67571e.ssl.cf1.rackcdn.com%2Fldm-images%2F2020-Honda-Accord-LX-Platinum-White-Color.jpeg&f=1&nofb=1&ipt=2a8ee10ecce9de163f55374eb1749ecc19b4fd7fee61142cea68502741456153&ipo=images",
          price: 27599,
          vin: "1HGCD5568TA081518",
          miles: 0,
        },
        {
          make: "Cadillac",
          model: "Escalade",
          newUsed: true,
          color: "Black",
          year: 2011,
          bodyType: "SUV",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.hgmsites.net%2Fhug%2F2011-cadillac-escalade-esv-awd-4-door-base-angular-front-exterior-view_100325618_h.jpg&f=1&nofb=1&ipt=772cb8ad6ec46f75fd2245af50fb76771e4c0a332ebd2f6df6e40393e5d6651f&ipo=images",
          price: 19989,
          vin: "1GYS4EEJ3BR279996",
          miles: 0,
        },
        {
          make: "Buick",
          model: "Enclave",
          newUsed: false,
          color: "Tan",
          year: 2009,
          bodyType: "SUV",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fworldautosales.com%2Fwp-content%2Fuploads%2F2019%2F02%2F2009-buick-enclave-cxl46-1199x674.jpg&f=1&nofb=1&ipt=397f144cf43efd0ebcee6b2add881cd05bd8d7a87bf3eab9d37635c1c54bac7b&ipo=images",
          price: 13479,
          vin: "5GAER23D99J166970",
          miles: 120000,
        },
        {
          make: "Audi",
          model: "Q5",
          newUsed: false,
          color: "White",
          year: 2012,
          bodyType: "SUV",
          image:
            "https://s.aolcdn.com/commerce/autodata/images/USC20AUS021B0101.jpg",
          price: 41299,
          vin: "WA1MKCFP0CA008450",
          miles: 95000,
        },
        {
          make: "Acura",
          model: "NSX",
          newUsed: false,
          color: "Red",
          year: 1997,
          bodyType: "Sedan",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.dealeraccelerate.com%2Favantgarde%2F1%2F627%2F38902%2F790x1024%2F1997-acura-nsx-t&f=1&nofb=1&ipt=f7b2eedd312e3349b078508dbbf3976e04a0529a5cdcfda24360ab6bd84d14a8&ipo=images",
          price: 57070,
          vin: "JH4NA2161VT800005",
          miles: 60000,
        },
        {
          make: "BMW",
          model: "M3",
          newUsed: false,
          color: "Red",
          year: 2006,
          bodyType: "Sport Coupe",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.autodetective.com%2Fuploads%2Fphotos%2Fbmw%2Fm3%2F2006%2F85833.jpg&f=1&nofb=1&ipt=410ff2dc554a84a44e2fb150fe27b3c804de8e6d3e9299b856a24d5c32611ddc&ipo=images",
          price: 51298,
          vin: "WBSBL93416P482540",
          miles: 110000,
        },
        {
          make: "Chevrolet",
          model: "Silverado 1500",
          newUsed: false,
          color: "Blue",
          year: 2015,
          bodyType: "Truck",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fblogmedia.dealerfire.com%2Fwp-content%2Fuploads%2Fsites%2F438%2F2018%2F03%2F2018-Chevy-Silverado-1500-Deep-Ocean-Blue-Metallic_o.jpg&f=1&nofb=1&ipt=aecf87684181b4d5cb93f24aab9cc66ac172ee47071c57f6056f9ae2db5e00f0&ipo=images",
          price: 33999,
          vin: "1GC4K1FG0E0017507",
          miles: 45000,
        },
        {
          make: "Volkswagen",
          model: "Golf GTI",
          newUsed: false,
          color: "Metallic Gray",
          year: 2012,
          bodyType: "Hatchback",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs.aolcdn.com%2Fcommerce%2Fautodata%2Fimages%2FCAC10VWC232A1135.jpg&f=1&nofb=1&ipt=fec86f7f48656ff1fcf7bfaac7a6c69cbe46d20c2e92d0d0e83ea6fac8be9975&ipo=images",
          price: 18920,
          vin: "WVWGV7AJ6BW335652",
          miles: 80000,
        },
        {
          make: "Chrysler",
          model: "PT Cruiser",
          newUsed: false,
          color: "Black",
          year: 1997,
          bodyType: "Hatchback",
          image:
            "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F1.bp.blogspot.com%2F_FoXyvaPSnVk%2FTDc5i2-sQBI%2FAAAAAAADDow%2F9oEJ08VUffc%2Fs800%2FChrysler-PT-Cruiser-01.jpg&f=1&nofb=1&ipt=56aa7b691336227343c7bdb2bc85075bf53a5fb558710e3476ab5f731f4d79ba&ipo=images",
          price: 9899,
          vin: "1C4GYN7M0VU131765",
          miles: 130000,
        },
        {
          make: "Dodge",
          model: "Viper SRT",
          newUsed: false,
          color: "Yellow",
          year: 2013,
          bodyType: "Sports Coupe",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.automobilesreview.com%2Fgallery%2F2013-dodge-viper-srt-track-pack%2F2013-dodge-viper-srt-track-pack-01.jpg&f=1&nofb=1&ipt=c6a99c2fe2edc587622e188b587c767eafcdfebc691ad5c44dbf98e447d80ad9&ipo=images",
          price: 97689,
          vin: "1C3ADEAZ8DV500150",
          miles: 35000,
        },
        {
          make: "Dodge",
          model: "Charger",
          newUsed: false,
          color: "Red",
          year: 2013,
          bodyType: "Coupe",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.jdpower.com%2FChromeImageGallery%2FColorMatched_01%2FWhite%2F640%2Fcc_2013DOD005b_01_640%2Fcc_2013DOD005b_01_640_PR3.jpg&f=1&nofb=1&ipt=62fd71ab9b6268f6956cea24af277a277c0dc25c9217a58b8e4db5fa0d1c1764&ipo=images",
          price: 21300,
          vin: "2C3CDXGT0D0019808",
          miles: 100000,
        },
        {
          make: "Ford",
          model: "Ranger",
          newUsed: false,
          color: "Dark Blue",
          year: 1999,
          bodyType: "Truck",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iihs.org%2Fapi%2Fratings%2Fmodel-year-images%2F2215&f=1&nofb=1&ipt=25f8fb898abcd4c6a64ecb2e03de335405f2b0e460c3caf67b406f745dfef02e&ipo=images",
          price: 7890,
          vin: "1FTYR10V0XPC00212",
          miles: 160000,
        },
        {
          make: "Ford",
          model: "Mustang GT500",
          newUsed: false,
          color: "Red",
          year: 2012,
          bodyType: "Sports Coupe",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.conceptcarz.com%2Fimages%2FFord%2F2012-Shelby-Mustang-GT500-Coupe-Image-07.jpg&f=1&nofb=1&ipt=9d8e44b84618123a0fe386af47681b42d68c3f28e43db729a08bdb5ca21cfd5a&ipo=images",
          price: 56700,
          vin: "1FDWX3G60C0019484",
          miles: 5090,
        },
        {
          make: "GMC",
          model: "Yukon XL",
          newUsed: false,
          color: "Tan",
          year: 2013,
          bodyType: "SUV",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.hgmsites.net%2Fhug%2F2013-gmc-yukon-xl-2wd-4-door-1500-slt-angular-front-exterior-view_100397893_h.jpg&f=1&nofb=1&ipt=4293d1cd9dad6b82bad97b61001dad2e9d580e412eda5577fdea2bbe08fd2c04&ipo=images",
          price: 44789,
          vin: "1GKW2SEG6DR357582",
          miles: 90000,
        },
        {
          make: "Honda",
          model: "Pilot",
          newUsed: false,
          color: "Quicksilver",
          year: 2013,
          bodyType: "SUV",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.hgmsites.net%2Fmed%2F2013-honda-pilot-2wd-4-door-ex-l-angular-front-exterior-view_100405294_m.jpg&f=1&nofb=1&ipt=e78649f391d4788eb877324b1f1521d7b2659d9eeb0af8b2c4fab82e71b1a597&ipo=images",
          price: 26700,
          vin: "5FNYF4H22DB015377",
          miles: 105000,
        },
        {
          make: "Hummer",
          model: "H2",
          newUsed: false,
          color: "Green",
          year: 2006,
          bodyType: "SUV",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimageonthefly.autodatadirect.com%2Fimages%2F%3FIMG%3DCAB60HUS041A0101.png&f=1&nofb=1&ipt=2dbfc03763fd5d1225f9936c8cfb085790f4aeb2631d2ce5b386c00a94e4b2a8&ipo=images",
          price: 33540,
          vin: "5GRGN23UX6H523139",
          miles: 115000,
        },
        {
          make: "Subaru",
          model: "Impreza",
          newUsed: false,
          color: "Silver",
          year: 2015,
          bodyType: "Sedan",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.tK2e-SVboFQHgBKswt94WQHaE4%26pid%3DApi&f=1&ipt=0c93c21f86690bbc46177ab84499b10b559bf0bfd8765d0d21ad4d277f58cf6d&ipo=images",
          price: 19899,
          vin: "JF1GPAT61FH328981",
          miles: 65600,
        },
        {
          make: "Subaru",
          model: "Outback",
          newUsed: false,
          color: "Silver",
          year: 2016,
          bodyType: "SUV",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Finventory-dmg.assets-cdk.com%2FChromeColorMatch%2Fus%2FWHITE_cc_2016SUC020001_02_1280_ISM.jpg&f=1&nofb=1&ipt=c57692f65a2e1518b14bf84acea5206cb916374f3d6364f163e459ea046d70a5&ipo=images",
          price: 20000,
          vin: "4S4BSBAC6G3257045",
          miles: 50090,
        },
        {
          make: "Nissan",
          model: "Armada",
          newUsed: false,
          color: "Brown",
          year: 2012,
          bodyType: "SUV",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.autobytel.com%2Fchrome%2Fcolormatched_01%2Fwhite%2F640%2Fcc_2013nis003a_01_640%2Fcc_2013nis003a_01_640_cae.jpg&f=1&nofb=1&ipt=611d85f7dfa680a1b76d0750a4323979418678c79e076cf4b0dd246858c67996&ipo=images",
          price: 16700,
          vin: "5N1BA0NE2DN600095",
          miles: 85080,
        },
        {
          make: "Porsche",
          model: "911 Turbo",
          newUsed: false,
          color: "Blue",
          year: 2006,
          bodyType: "Sports Coupe",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs1.cdn.autoevolution.com%2Fimages%2Fgallery%2FPORSCHE-911-Turbo--997--1344_44.jpg&f=1&nofb=1&ipt=1ab725dd54c9201a41dd98f249f87acaddab9e1fef76c669445f90da2d4ff4ea&ipo=images",
          price: 102000,
          vin: "WP0AA29966S716557",
          miles: 4200,
        },
        {
          make: "Jeep",
          model: "Wrangler",
          newUsed: false,
          color: "Silver",
          year: 2009,
          bodyType: "SUV",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.dealeraccelerate.com%2Fcam%2F34%2F731%2F11548%2F1920x1440%2F2009-jeep-wrangler&f=1&nofb=1&ipt=903d34785cdaf76d3bd115ae01e46e7d8da2535bea4a3aad1e9a1ec2dad5c266&ipo=images",
          price: 13578,
          vin: "1J4GE69189L703205",
          miles: 67000,
        },
        {
          make: "Alfa Romeo",
          model: "4c",
          newUsed: false,
          color: "White",
          year: 2022,
          bodyType: "Sports Coupe",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimageonthefly.autodatadirect.com%2Fimages%2F%3FIMG%3DUSC90ALC061A021001.png&f=1&nofb=1&ipt=57688f26798fa778479f1c5e1f2d59e45f6e0ffd6e6077b58d4d14df232d24a5&ipo=images",
          price: 83299,
          vin: "ZARBB42N1M6006871",
          miles: 13000,
        },
        {
          make: "Toyota",
          model: "Supra",
          newUsed: false,
          color: "Blue",
          year: 2021,
          bodyType: "Sports Coupe",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fperformancedrive.com.au%2Fwp-content%2Fuploads%2F2020%2F04%2F2021-Toyota-Supra-RZ-Horizon-Blue-edition.jpg&f=1&nofb=1&ipt=5642ac3df31c88e425b98d8e6d40b9a2aa84de9efc45e5f4f1b78f0b656fb2de&ipo=images",
          price: 47988,
          vin: "JT2SW22M0N0056944",
          miles: 23288,
        },
        {
          make: "Porsche",
          model: "GT4RS",
          newUsed: true,
          color: "Grey",
          year: 2023,
          bodyType: "Sports Coupe",
          image:
            "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.carbuzz.com%2Fcar-thumbnails%2Foriginal%2F12000%2F800%2F12858.jpg&f=1&nofb=1&ipt=edd9cc0ed136692312530ef1dd7d910903aedcdd25898b146041383337be5a46&ipo=images",
          price: 93899,
          vin: "WP0JA2920L0010792",
          miles: 900,
        },
        {
          make: "Rolls Royce",
          model: "Ghost",
          newUsed: true,
          color: "Black",
          year: 2024,
          bodyType: "Sedan",
          image:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F21motoring.com%2Fwp-content%2Fuploads%2F2023%2F10%2F2024-Rolls-Royce-Ghost-Ekleipsis.jpg&f=1&nofb=1&ipt=3a3c530d9752ac6fd458bc88a96df6247836a1dc0abe0aa2e4e0ce0f53a1e922&ipo=images",
          price: 320000,
          vin: "SCAZD02D1MCX30569",
          miles: 1200,
        },
      ],
    });
    console.log("Cars seeded successfully:", cars);
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
