let transfers = [];


// =========================
// ELEMENTS
// =========================

const transferContainer =
    document.getElementById("transferContainer");

const searchInput =
    document.getElementById("searchInput");

const clubFilter =
    document.getElementById("clubFilter");

const positionFilter =
    document.getElementById("positionFilter");

const sortFilter =
    document.getElementById("sortFilter");


// =========================
// RENDER TRANSFERS
// =========================

function renderTransfers() {

    if (!transferContainer) {
        return;
    }

    const searchText =
        searchInput ? searchInput.value.toLowerCase().trim() : "";

    const selectedClub =
        clubFilter ? clubFilter.value : "all";

    const selectedPosition =
        positionFilter ? positionFilter.value : "all";

    const selectedSort =
        sortFilter ? sortFilter.value : "latest";


    const filteredTransfers = transfers.filter(function(transfer) {

        const matchesSearch =
            transfer.player.toLowerCase().includes(searchText);


        const matchesClub =
            selectedClub === "all" ||
            transfer.newClub === selectedClub;


        const matchesPosition =
            selectedPosition === "all" ||
            transfer.positionCategory === selectedPosition;


        return (
            matchesSearch &&
            matchesClub &&
            matchesPosition
        );

    });


    filteredTransfers.sort(function(a, b) {

        if (selectedSort === "latest") {
            return new Date(b.transferDate) -
                   new Date(a.transferDate);
        }


        if (selectedSort === "oldest") {
            return new Date(a.transferDate) -
                   new Date(b.transferDate);
        }


        if (selectedSort === "highestFee") {

            return parseFloat(
                b.marketValue
                    .replace("€", "")
                    .replace("M", "")
            ) -

            parseFloat(
                a.marketValue
                    .replace("€", "")
                    .replace("M", "")
            );
        }


        if (selectedSort === "lowestFee") {

            return parseFloat(
                a.marketValue
                    .replace("€", "")
                    .replace("M", "")
            ) -

            parseFloat(
                b.marketValue
                    .replace("€", "")
                    .replace("M", "")
            );
        }


        if (selectedSort === "az") {
            return a.player.localeCompare(b.player);
        }

    });


    transferContainer.innerHTML = "";


    if (filteredTransfers.length === 0) {

        transferContainer.innerHTML = `
            <p class="no-results">
                No transfers found. Try another player, club, or position.
            </p>
        `;

        return;
    }


    filteredTransfers.forEach(function(transfer) {

        const card =
            document.createElement("article");

        card.classList.add("transfer-card");


        card.addEventListener("click", function() {
            showPlayerDetails(transfer);
        });


        card.innerHTML = `

            <img
                src="${transfer.image}"
                alt="${transfer.player}"
                class="player-image"
            >

            <h3>${transfer.player}</h3>

            <span class="status-badge">
                ${transfer.status}
            </span>


            <div class="transfer-route">

                <div class="club">

                    <img
                        src="${transfer.oldClubLogo}"
                        alt="${transfer.oldClub}"
                    >

                    <span>
                        ${transfer.oldClub}
                    </span>

                </div>


                <span class="transfer-arrow">
                    →
                </span>


                <div class="club">

                    <img
                        src="${transfer.newClubLogo}"
                        alt="${transfer.newClub}"
                    >

                    <span>
                        ${transfer.newClub}
                    </span>

                </div>

            </div>


            <p>
                Position: ${transfer.position}
            </p>

            <p>
                Market Value: ${transfer.marketValue}
            </p>
        `;


        transferContainer.appendChild(card);

    });

}


// =========================
// UPDATE STATISTICS
// =========================

function updateStatistics() {

    const totalTransfers =
        transfers.length;


    const totalValue =
        transfers.reduce(function(total, transfer) {

            return total + parseFloat(
                transfer.marketValue
                    .replace("€", "")
                    .replace("M", "")
            );

        }, 0);


    const positions =
        new Set(
            transfers.map(function(transfer) {
                return transfer.positionCategory;
            })
        );


    const totalTransfersElement =
        document.getElementById("totalTransfers");

    const totalValueElement =
        document.getElementById("totalValue");

    const totalPositionsElement =
        document.getElementById("totalPositions");


    if (totalTransfersElement) {
        totalTransfersElement.textContent =
            totalTransfers;
    }


    if (totalValueElement) {
        totalValueElement.textContent =
            "€" + totalValue + "M";
    }


    if (totalPositionsElement) {
        totalPositionsElement.textContent =
            positions.size;
    }

}


// =========================
// LATEST TRANSFERS
// =========================

const latestTransferContainer =
    document.getElementById("latestTransferContainer");


function renderLatestTransfers() {

    if (!latestTransferContainer) {
        return;
    }


    const latestTransfers =
        [...transfers]
            .sort(function(a, b) {

                return new Date(b.transferDate) -
                       new Date(a.transferDate);

            })
            .slice(0, 6);


    latestTransferContainer.innerHTML = "";


    latestTransfers.forEach(function(transfer) {

        const item =
            document.createElement("div");


        item.classList.add(
            "latest-transfer-item"
        );


        item.innerHTML = `

            <img
                src="${transfer.image}"
                alt="${transfer.player}"
                class="latest-player-image"
            >


            <div class="latest-transfer-info">

                <h3>
                    ${transfer.player}
                </h3>

                <p>
                    ${transfer.oldClub} → ${transfer.newClub}
                </p>

                <span>
                    ${transfer.marketValue}
                </span>

            </div>
        `;


        item.addEventListener("click", function() {
            showPlayerDetails(transfer);
        });


        latestTransferContainer.appendChild(item);

    });

}


// =========================
// PLAYER MODAL
// =========================

function showPlayerDetails(transfer) {

    const modal =
        document.getElementById("playerModal");

    if (!modal) {
        return;
    }


    const modalPlayerImage =
        document.getElementById("modalPlayerImage");

    const modalPlayerName =
        document.getElementById("modalPlayerName");

    const modalPosition =
        document.getElementById("modalPosition");

    const modalOldClub =
        document.getElementById("modalOldClub");

    const modalNewClub =
        document.getElementById("modalNewClub");

    const modalOldClubLogo =
        document.getElementById("modalOldClubLogo");

    const modalNewClubLogo =
        document.getElementById("modalNewClubLogo");

    const modalMarketValue =
        document.getElementById("modalMarketValue");

    const modalStatus =
        document.getElementById("modalStatus");

    const modalTransferDate =
        document.getElementById("modalTransferDate");


    if (modalPlayerImage) {
        modalPlayerImage.src = transfer.image;
        modalPlayerImage.alt = transfer.player;
    }


    if (modalPlayerName) {
        modalPlayerName.textContent =
            transfer.player;
    }


    if (modalPosition) {
        modalPosition.textContent =
            transfer.position;
    }


    if (modalOldClub) {
        modalOldClub.textContent =
            transfer.oldClub;
    }


    if (modalNewClub) {
        modalNewClub.textContent =
            transfer.newClub;
    }


    if (modalOldClubLogo) {
        modalOldClubLogo.src =
            transfer.oldClubLogo;

        modalOldClubLogo.alt =
            transfer.oldClub;
    }


    if (modalNewClubLogo) {
        modalNewClubLogo.src =
            transfer.newClubLogo;

        modalNewClubLogo.alt =
            transfer.newClub;
    }


    if (modalMarketValue) {
        modalMarketValue.textContent =
            transfer.marketValue;
    }


    if (modalStatus) {
        modalStatus.textContent =
            transfer.status;
    }


    const formattedDate =
        new Date(transfer.transferDate)
            .toLocaleDateString(
                "en-GB",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );


    if (modalTransferDate) {
        modalTransferDate.textContent =
            formattedDate;
    }


    modal.style.display = "flex";

}


// =========================
// CLOSE MODAL
// =========================

const closeModal =
    document.getElementById("closeModal");


if (closeModal) {

    closeModal.addEventListener(
        "click",
        function() {

            const modal =
                document.getElementById("playerModal");

            if (modal) {
                modal.style.display = "none";
            }

        }
    );

}


const playerModal =
    document.getElementById("playerModal");


if (playerModal) {

    playerModal.addEventListener(
        "click",
        function(event) {

            if (event.target === playerModal) {

                playerModal.style.display =
                    "none";

            }

        }
    );

}


// =========================
// FILTER EVENTS
// =========================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function() {
            renderTransfers();
        }
    );

}


if (clubFilter) {

    clubFilter.addEventListener(
        "change",
        function() {
            renderTransfers();
        }
    );

}


if (positionFilter) {

    positionFilter.addEventListener(
        "change",
        function() {
            renderTransfers();
        }
    );

}


if (sortFilter) {

    sortFilter.addEventListener(
        "change",
        function() {
            renderTransfers();
        }
    );

}


// =========================
// CLUBS PAGE
// =========================

function getClubLogo(clubName) {

    const clubLogos = {

        "FC Barcelona":
            "images/clubs/barcelona.png",

        "Manchester City":
            "images/clubs/manchester-city.png",

        "Manchester United":
            "images/clubs/manchester-united.png",

        "Liverpool F.C":
            "images/clubs/liverpool.png",

        "Real Madrid":
            "images/clubs/real-madrid.png",

        "Chelsea":
            "images/clubs/chelsea.png",

        "Arsenal":
            "images/clubs/arsenal.png",

        "Bayern Munich":
            "images/clubs/bayern-munich.png",

        "Newcastle United":
            "images/clubs/newcastle-united.png",

        "Aston Villa":
            "images/clubs/aston-villa.png",

        "Borussia Dortmund":
            "images/clubs/borussia-dortmund.png",

        "AC Milan":
            "images/clubs/ac-milan.png",

        "Brighton":
            "images/clubs/brighton.png",

        "Sporting CP":
            "images/clubs/sporting-cp.png",

        "Bournemouth":
            "images/clubs/bournemouth.png",

        "River Plate":
            "images/clubs/river-plate.png",

        "Bayer Leverkusen":
            "images/clubs/bayer-leverkusen.png",

        "Al Hilal":
            "images/clubs/al-hilal.png",

        "Al-Qadsiah":
            "images/clubs/al-qadsiah.png",

        "Club Brugge":
            "images/clubs/club-brugge.png",

        "Tottenham Hotspur":
            "images/clubs/tottenhamhotspur.png"

    };


    return (
        clubLogos[clubName] ||
        "images/clubs/default.png"
    );

}


const clubsContainer =
    document.getElementById("clubsContainer");


const clubDetails =
    document.getElementById("clubDetails");


// =========================
// RENDER CLUBS
// =========================

function renderClubs() {

    if (!clubsContainer) {
        return;
    }


    const clubs = [];


    transfers.forEach(function(transfer) {

        if (!clubs.includes(transfer.oldClub)) {

            clubs.push(transfer.oldClub);

        }


        if (!clubs.includes(transfer.newClub)) {

            clubs.push(transfer.newClub);

        }

    });


    clubs.sort();


    clubsContainer.innerHTML = "";


    if (clubs.length === 0) {

        clubsContainer.innerHTML = `
            <p class="no-results">
                No clubs found.
            </p>
        `;

        return;
    }


    clubs.forEach(function(club) {

        const clubCard =
            document.createElement("div");


        clubCard.classList.add(
            "club-card"
        );


        clubCard.addEventListener(
            "click",
            function() {

                showClubTransfers(club);

            }
        );


        clubCard.innerHTML = `

            <div class="club-logo">

                <img
                    src="${getClubLogo(club)}"
                    alt="${club}"
                >

            </div>


            <h3>
                ${club}
            </h3>


            <p>
                View transfer activity
            </p>

        `;


        clubsContainer.appendChild(
            clubCard
        );

    });

}


// =========================
// SHOW CLUB TRANSFERS
// =========================

function showClubTransfers(clubName) {

    if (!clubDetails) {
        return;
    }


    const clubTransfers =
        transfers.filter(function(transfer) {

            return (
                transfer.oldClub === clubName ||
                transfer.newClub === clubName
            );

        });


    const incomingTransfers =
        clubTransfers.filter(function(transfer) {

            return transfer.newClub === clubName;

        });


    const outgoingTransfers =
        clubTransfers.filter(function(transfer) {

            return transfer.oldClub === clubName;

        });


    clubDetails.innerHTML = `

        <div class="club-details-header">

            <div class="club-details-title">

                <div class="club-details-logo">

                    <img
                        src="${getClubLogo(clubName)}"
                        alt="${clubName}"
                    >

                </div>


                <div>

                    <span class="section-label">
                        CLUB TRANSFERS
                    </span>

                    <h2>
                        ${clubName}
                    </h2>

                </div>

            </div>


            <button
                class="close-club-details"
                onclick="closeClubDetails()"
            >
                ✕
            </button>

        </div>


        <div class="club-transfer-columns">

            <div class="club-transfer-section">

                <h3>
                    Incoming Transfers
                </h3>

                <div class="club-transfer-list">

                    ${renderClubTransferList(
                        incomingTransfers
                    )}

                </div>

            </div>


            <div class="club-transfer-section">

                <h3>
                    Outgoing Transfers
                </h3>

                <div class="club-transfer-list">

                    ${renderClubTransferList(
                        outgoingTransfers
                    )}

                </div>

            </div>

        </div>

    `;


    clubDetails.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// =========================
// CLUB TRANSFER LIST
// =========================

function renderClubTransferList(transferList) {

    if (transferList.length === 0) {

        return `
            <p class="no-transfers">
                No transfers found.
            </p>
        `;

    }


    return transferList.map(
        function(transfer) {

            return `

                <div
                    class="club-transfer-item"
                    onclick='showPlayerDetails(${JSON.stringify(transfer)})'
                >

                    <img
                        src="${transfer.image}"
                        alt="${transfer.player}"
                    >


                    <div class="club-transfer-info">

                        <h4>
                            ${transfer.player}
                        </h4>

                        <p>
                            ${transfer.oldClub}
                            →
                            ${transfer.newClub}
                        </p>

                    </div>


                    <strong>
                        ${transfer.marketValue}
                    </strong>

                </div>

            `;

        }
    ).join("");

}


// =========================
// CLOSE CLUB DETAILS
// =========================

function closeClubDetails() {

    if (!clubDetails) {
        return;
    }

    clubDetails.innerHTML = "";

}


// =========================
// FETCH TRANSFERS FROM API
// =========================

fetch("http://localhost:5000/api/transfers")

    .then(function(response) {

        if (!response.ok) {
            throw new Error(
                "Failed to fetch transfers"
            );
        }

        return response.json();

    })

    .then(function(data) {

        transfers = data;


        // Homepage
        if (transferContainer) {

            renderTransfers();

            updateStatistics();

        }


        // Latest Transfers
        if (latestTransferContainer) {

            renderLatestTransfers();

        }


        // Clubs Page
        if (clubsContainer) {

            renderClubs();

        }

    })

    .catch(function(error) {

        console.error(
            "Error fetching transfers:",
            error
        );

    });