
const adminToken = localStorage.getItem("adminToken");

if (!adminToken) {
    window.location.href = "admin-login.html";
}


async function loadStatistics() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/transfers"
        );

        const transfers = await response.json();

        const totalTransfers = transfers.length;

        const confirmedTransfers = transfers.filter(function(transfer) {
            return transfer.status === "Confirmed";
        }).length;

        const clubs = new Set();

        transfers.forEach(function(transfer) {
            clubs.add(transfer.oldClub);
            clubs.add(transfer.newClub);
        });

        document.getElementById("totalTransfers").textContent =
            totalTransfers;

        document.getElementById("confirmedTransfers").textContent =
            confirmedTransfers;

        document.getElementById("clubsInvolved").textContent =
            clubs.size;

    } catch (error) {

        console.error("Failed to load statistics:", error);

    }
}


const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
    logoutButton.addEventListener("click", function() {

        localStorage.removeItem("adminToken");

        window.location.href = "admin-login.html";
    });
}


const transferForm = document.getElementById("transferForm");

const message = document.getElementById("message");

const transferTableBody = document.getElementById("transferTableBody");

const submitButton = document.getElementById("submitButton");


let editingTransferId = null;


// ADD / UPDATE TRANSFER
transferForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const transferData = {
        player: document.getElementById("player").value,
        oldClub: document.getElementById("oldClub").value,
        newClub: document.getElementById("newClub").value,
        position: document.getElementById("position").value,
        positionCategory: document.getElementById("positionCategory").value,
        marketValue: document.getElementById("marketValue").value,
        status: document.getElementById("status").value,
        transferDate: document.getElementById("transferDate").value,
        image: document.getElementById("image").value,
        oldClubLogo: document.getElementById("oldClubLogo").value,
        newClubLogo: document.getElementById("newClubLogo").value
    };

    try {

        let response;

        // EDIT MODE
        if (editingTransferId) {

            response = await fetch(
                `http://localhost:5000/api/transfers/${editingTransferId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${adminToken}`
                    },
                    body: JSON.stringify(transferData)
                }
            );

        }

        // ADD MODE
        else {

            response = await fetch(
                "http://localhost:5000/api/transfers",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${adminToken}`
                    },
                    body: JSON.stringify(transferData)
                }
            );

        }

        const data = await response.json();

        if (response.ok) {

            if (editingTransferId) {
                message.textContent = "Transfer updated successfully!";
            } else {
                message.textContent = "Transfer added successfully!";
            }

            transferForm.reset();

            editingTransferId = null;

            submitButton.textContent = "Add Transfer";

            loadTransfers();

        } else {

            message.textContent =
                data.message || "Something went wrong.";

        }

    } catch (error) {

        console.error("Error:", error);

        message.textContent = "Server connection failed.";

    }
});


// LOAD ALL TRANSFERS
async function loadTransfers() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/transfers"
        );

        const transfers = await response.json();

        transferTableBody.innerHTML = "";

        transfers.forEach(function(transfer) {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${transfer.player}</td>
                <td>${transfer.oldClub}</td>
                <td>${transfer.newClub}</td>
                <td>${transfer.marketValue}</td>
                <td>${transfer.status}</td>

                <td>
                    <button class="edit-btn" onclick="editTransfer('${transfer._id}')">
                    Edit
                    </button>

                    <button class="delete-btn" onclick="deleteTransfer('${transfer._id}')">
                    Delete
                    </button>
                </td>
            `;

            transferTableBody.appendChild(row);

        });

    } catch (error) {

        console.error("Failed to load transfers:", error);

    }
}


// EDIT TRANSFER
async function editTransfer(id) {

    try {

        const response = await fetch(
            `http://localhost:5000/api/transfers/id/${id}`
        );

        const transfer = await response.json();

        if (!response.ok) {

            message.textContent =
                transfer.message || "Transfer not found.";

            return;
        }

        editingTransferId = transfer._id;


        document.getElementById("player").value =
            transfer.player;

        document.getElementById("oldClub").value =
            transfer.oldClub;

        document.getElementById("newClub").value =
            transfer.newClub;

        document.getElementById("position").value =
            transfer.position;

        document.getElementById("positionCategory").value =
            transfer.positionCategory;

        document.getElementById("marketValue").value =
            transfer.marketValue;

        document.getElementById("status").value =
            transfer.status;

        document.getElementById("transferDate").value =
            transfer.transferDate;

        document.getElementById("image").value =
            transfer.image;

        document.getElementById("oldClubLogo").value =
            transfer.oldClubLogo;

        document.getElementById("newClubLogo").value =
            transfer.newClubLogo;


        submitButton.textContent = "Update Transfer";


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {

        console.error("Edit error:", error);

        message.textContent =
            "Failed to load transfer.";

    }
}


// DELETE TRANSFER
async function deleteTransfer(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this transfer?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/transfers/${id}`,
            {
                method: "DELETE",
                headers: {
                     "Authorization": `Bearer ${adminToken}`
                }
            }
        );

        const data = await response.json();

        if (response.ok) {

            message.textContent =
                "Transfer deleted successfully!";

            loadTransfers();

        } else {

            message.textContent =
                data.message || "Failed to delete transfer.";

        }

    } catch (error) {

        console.error("Delete error:", error);

        message.textContent =
            "Server connection failed.";

    }
}


// LOAD TRANSFERS WHEN PAGE OPENS
loadTransfers();