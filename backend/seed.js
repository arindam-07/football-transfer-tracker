const mongoose = require("mongoose");

require("dotenv").config();

const Transfer = require("./models/Transfer");

const transfers = [
    {
        player: "Rodri",
        oldClub: "Manchester City",
        newClub: "FC Barcelona",
        position: "Defensive Midfielder",
        positionCategory: "Midfielder",
        marketValue: "€60M",
        status: "Confirmed",
        transferDate: "2026-08-18",
        image: "images/rodri.jpg",
        oldClubLogo: "images/clubs/manchester-city.png",
        newClubLogo: "images/clubs/barcelona.png"
    },

    {
        player: "Anthony Gordon",
        oldClub: "Newcastle United",
        newClub: "FC Barcelona",
        position: "Left Winger",
        positionCategory: "Winger",
        marketValue: "€80M",
        status: "Confirmed",
        transferDate: "2026-08-20",
        image: "images/anthony-gordon.jpg",
        oldClubLogo: "images/clubs/newcastle-united.png",
        newClubLogo: "images/clubs/barcelona.png"
    },

   
    {
        player: "Andrey Santos",
        oldClub: "Chelsea",
        newClub: "Manchester United",
        position: "Central Midfielder",
        positionCategory: "Midfielder",
        marketValue: "€48M",
        status: "Confirmed",
        transferDate: "2026-08-01",
        image: "images/andrey-santos.jpg",
        oldClubLogo: "images/clubs/chelsea.png",
        newClubLogo: "images/clubs/manchester-united.png"
    },

    {
    player: "Jesse Bisiwu",
    oldClub: "Club Brugge",
    newClub: "FC Barcelona",
    position: "Left Winger",
    positionCategory: "Winger",
    marketValue: "€8.5M",
    status: "Confirmed",
    transferDate: "2026-07-31",
    image: "images/jesse-bisiwu.jpg",
    oldClubLogo: "images/clubs/club-brugge.png",
    newClubLogo: "images/clubs/barcelona.png"
    },


    {
        player: "Youri Tielemans",
        oldClub: "Aston Villa",
        newClub: "Manchester United",
        position: "Central Midfielder",
        positionCategory: "Midfielder",
        marketValue: "€35M",
        status: "Confirmed",
        transferDate: "2026-07-15",
        image:"images/youri-tielemans.jpg",
        oldClubLogo: "images/clubs/aston-villa.png",
        newClubLogo: "images/clubs/manchester-united.png"
    },

    {
    player: "Karim Adeyemi",
    oldClub: "Borussia Dortmund",
    newClub: "FC Barcelona",
    position: "Winger",
    positionCategory: "Winger",
    marketValue: "€22M",
    status: "Confirmed",
    transferDate: "2026-07-23",
    image: "images/karim-adeyemi.jpg",
    oldClubLogo: "images/clubs/borussia-dortmund.png",
    newClubLogo: "images/clubs/barcelona.png"
    },


    {
        player: "João Cancelo",
        oldClub: "Al Hilal",
        newClub: "FC Barcelona",
        position: "Right Back",
        positionCategory: "Full Back",
        marketValue: "€0M (Free Agent)",
        status: "Confirmed",
        transferDate: "2026-08-20",
        image: "images/joao-cancelo.jpg",
        oldClubLogo: "images/clubs/al-hilal.png",
        newClubLogo: "images/clubs/barcelona.png"
    },


    {
        player: "Florian Wirtz",
        oldClub: "Bayer Leverkusen",
        newClub: "Liverpool F.C",
        position: "Attacking Midfielder",
        positionCategory: "Midfielder",
        marketValue: "€140M",
        status: "Confirmed",
        transferDate: "2025-06-20",
        image: "images/florian-wirtz.jpg",
        oldClubLogo: "images/clubs/bayer-leverkusen.png",
        newClubLogo: "images/clubs/liverpool.png"
    },
    

    {
        player: "Trent Alexander-Arnold",
        oldClub: "Liverpool F.C",
        newClub: "Real Madrid",
        position: "Right Back",
        positionCategory: "Defender",
        marketValue: "€50M",
        status: "Confirmed",
        transferDate: "2025-06-01",
        image:"images/trent-alexander-arnold.jpg",
        oldClubLogo: "images/clubs/liverpool.png",
        newClubLogo: "images/clubs/real-madrid.png"
    },

    {
        player: "Dean Huijsen",
        oldClub: "Bournemouth",
        newClub: "Real Madrid",
        position: "Centre Back",
        positionCategory: "Defender",
        marketValue: "€62.5M",
        status: "Confirmed",
        transferDate: "2025-06-01",
        image:"images/dean-huijsen.jpg",
        oldClubLogo: "images/clubs/bournemouth.png",
        newClubLogo: "images/clubs/real-madrid.png"

    },

    {
        player: "Franco Mastantuono",
        oldClub: "River Plate",
        newClub: "Real Madrid",
        position: "Right Winger",
        positionCategory: "Winger",
        marketValue: "€45M",
        status: "Confirmed",
        transferDate: "2025-08-14",
        image:"images/franco-mastantuono.jpg",
        oldClubLogo: "images/clubs/river-plate.png",
        newClubLogo: "images/clubs/real-madrid.png"
    },

    {
        player: "Luis Díaz",
        oldClub: "Liverpool F.C",
        newClub: "Bayern Munich",
        position: "Left Winger",
        positionCategory: "Winger",
        marketValue: "€75M",
        status: "Confirmed",
        transferDate: "2025-07-30",
        image:"images/luis-diaz.jpg",
        oldClubLogo: "images/clubs/liverpool.png",
        newClubLogo: "images/clubs/bayern-munich.png"
    },

    {
        player: "Viktor Gyökeres",
        oldClub: "Sporting CP",
        newClub: "Arsenal",
        position: "Centre Forward",
        positionCategory: "Forward",
        marketValue: "€63.5M",
        status: "Confirmed",
        transferDate: "2025-07-26",
        image:"images/viktor-gyokeres.jpg",
        oldClubLogo: "images/clubs/sporting-cp.png",
        newClubLogo: "images/clubs/arsenal.png"
    },

    {
        player: "Alexander Isak",
        oldClub: "Newcastle United",
        newClub: "Liverpool F.C",
        position: "Centre Forward",
        positionCategory: "Forward",
        marketValue: "€145M",
        status: "Confirmed",
        transferDate: "2025-09-01",
        image:"images/alexander-isak.jpg",
        oldClubLogo: "images/clubs/newcastle-united.png",
        newClubLogo: "images/clubs/liverpool.png"
    },

    {
        player: "Tijjani Reijnders",
        oldClub: "AC Milan",
        newClub: "Manchester City",
        position: "Central Midfielder",
        positionCategory: "Midfielder",
        marketValue: "€55M",
        status: "Confirmed",
        transferDate: "2025-06-11",
        image:"images/tijjani-reijnders.jpg",
        oldClubLogo: "images/clubs/ac-milan.png",
        newClubLogo: "images/clubs/manchester-city.png"
    },

    {
        player: "João Pedro",
        oldClub: "Brighton",
        newClub: "Chelsea",
        position: "Centre Forward",
        positionCategory: "Forward",
        marketValue: "€63M",
        status: "Confirmed",
        transferDate: "2025-07-02",
        image:"images/joao-pedro.jpg",
        oldClubLogo: "images/clubs/brighton.png",
        newClubLogo: "images/clubs/chelsea.png"
    },

    {
        player: "Marcus Rashford",
        oldClub: "Manchester United",
        newClub: "FC Barcelona",
        position: "Left Winger",
        positionCategory: "Winger",
        marketValue: "€35M",
        status: "Confirmed",
        transferDate: "2025-07-23",
        image:"images/marcus-rashford.jpg",
        oldClubLogo: "images/clubs/manchester-united.png",
        newClubLogo: "images/clubs/barcelona.png"
    },


    // =========================
    // 2026 TRANSFERS
    // =========================

    {
        player: "Carlos Baleba",
        oldClub: "Brighton",
        newClub: "Manchester United",
        position: "Defensive Midfielder",
        positionCategory: "Midfielder",
        marketValue: "€80M",
        status: "Confirmed",
        transferDate: "2026-08-25",
        image:"images/carlos-baleba.jpg",
        oldClubLogo: "images/clubs/brighton.png",
        newClubLogo: "images/clubs/manchester-united.png"
    },

    {
        player: "Sávio",
        oldClub: "Manchester City",
        newClub: "Tottenham Hotspur",
        position: "Right Winger",
        positionCategory: "Winger",
        marketValue: "€85M",
        status: "Confirmed",
        transferDate: "2026-08-25",
        image:"images/savio.jpg",
        oldClubLogo: "images/clubs/manchester-city.png",
        newClubLogo: "images/clubs/tottenhamhotspur.png"
    },

    {
        player: "Tijjani Reijnders",
        oldClub: "Manchester City",
        newClub: "Al-Qadsiah",
        position: "Central Midfielder",
        positionCategory: "Midfielder",
        marketValue: "€60M",
        status: "Confirmed",
        transferDate: "2026-08-19",
        image:"images/tijjani-reijnders.png",
        oldClubLogo:"images/clubs/manchester-city.png",
        newClubLogo:"images/clubs/al-qadsiah.png"
    }

    
    

];

mongoose.connect(process.env.MONGO_URI)

    .then(async function() {
        
        console.log("MongoDB connected!");

        await Transfer.deleteMany({});
        await Transfer.insertMany(transfers);

        console.log("Transfers inserted successfully!");

        mongoose.connection.close();
    })
    .catch(function(error) {
        console.error("Seeding failed:", error.message);
    });